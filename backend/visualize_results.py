import pickle
import pathlib
from typing import List

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn import model_selection
from sklearn import metrics


SALES_PATH = "data/kc_house_data.csv"
DEMOGRAPHICS_PATH = "data/zipcode_demographics.csv"
SALES_COLUMN_SELECTION: List[str] = [
    "price",
    "bedrooms",
    "bathrooms",
    "sqft_living",
    "sqft_lot",
    "floors",
    "sqft_above",
    "sqft_basement",
    "zipcode",
]

MODEL_PATH = "model/model.pkl"


def load_data(
    sales_path: str, demographics_path: str, sales_column_selection: List[str]
):
    data = pd.read_csv(
        sales_path, usecols=sales_column_selection, dtype={"zipcode": str}
    )
    demographics = pd.read_csv(demographics_path, dtype={"zipcode": str})
    merged = data.merge(demographics, how="left", on="zipcode").drop(columns="zipcode")
    y = merged.pop("price")
    X = merged
    return X, y


def compute_metrics(y_true, y_pred):
    # some sklearn versions don't accept the 'squared' kwarg; compute RMSE explicitly
    rmse = float(np.sqrt(metrics.mean_squared_error(y_true, y_pred)))
    r2 = metrics.r2_score(y_true, y_pred)
    return rmse, r2


def make_plot(y_actual, y_predicted, out_path: pathlib.Path, n_outliers: int = 5):
    # Build figure with left table and right scatter
    fig, axes = plt.subplots(
        1, 2, figsize=(14, 6), gridspec_kw={"width_ratios": [1, 2]}
    )

    # Placeholder metrics table on left (filled externally)
    axes[0].axis("off")

    # Scatter on right
    ax = axes[1]
    sns.scatterplot(x=y_actual, y=y_predicted, alpha=0.6, ax=ax)

    # Diagonal perfect-prediction line
    mn = min(y_actual.min(), y_predicted.min())
    mx = max(y_actual.max(), y_predicted.max())
    ax.plot([mn, mx], [mn, mx], linestyle="--", color="k", linewidth=1)

    # Identify top-n outliers by absolute error
    errors = (y_actual - y_predicted).abs()
    if len(errors) > 0:
        top_idx = errors.nlargest(n_outliers).index
        ax.scatter(
            y_actual.loc[top_idx],
            y_predicted.loc[top_idx],
            color="red",
            s=60,
            label="Outliers",
        )
        for i in top_idx:
            ax.annotate(
                f"{int(errors.loc[i]):,}",
                (y_actual.loc[i], y_predicted.loc[i]),
                textcoords="offset points",
                xytext=(5, 5),
                ha="left",
                fontsize=8,
            )

    ax.set_xlabel("Actual price")
    ax.set_ylabel("Predicted price")
    ax.set_title("Predicted vs Actual (test set)")
    ax.legend()

    fig.tight_layout()
    fig.savefig(out_path)
    print(f"Saved visualization to {out_path}")


def main():
    workspace = pathlib.Path(__file__).parent

    # Load data
    X, y = load_data(SALES_PATH, DEMOGRAPHICS_PATH, SALES_COLUMN_SELECTION)

    # reproduce the same split used for training (create_model.py used random_state=42)
    X_train, X_test, y_train, y_test = model_selection.train_test_split(
        X, y, random_state=42
    )

    # Load model
    model_file = workspace / MODEL_PATH
    if not model_file.exists():
        raise SystemExit(
            f"Model file not found at {model_file} - run training first or point MODEL_PATH to the model artifact"
        )

    with open(model_file, "rb") as f:
        model = pickle.load(f)

    # Predict
    y_pred_train = model.predict(X_train)
    y_pred_test = model.predict(X_test)

    # Compute metrics
    rmse_train, r2_train = compute_metrics(y_train, y_pred_train)
    rmse_test, r2_test = compute_metrics(y_test, y_pred_test)

    # Prepare metrics table content (center-aligned formatting will be handled in matplotlib table)
    metrics_table = pd.DataFrame(
        {
            "Train": [f"{rmse_train:,.0f}", f"{r2_train:.2f}"],
            "Test": [f"{rmse_test:,.0f}", f"{r2_test:.2f}"],
        },
        index=["RMSE", "R²"],
    )

    # Create plot and table
    out_file = workspace / "results_scatter.png"

    # Create composite figure: left table, right scatter
    fig, axes = plt.subplots(
        1, 2, figsize=(14, 6), gridspec_kw={"width_ratios": [1, 2]}
    )
    # Left: table
    axes[0].axis("off")
    table = axes[0].table(
        cellText=metrics_table.values,
        colLabels=metrics_table.columns,
        rowLabels=metrics_table.index,
        loc="center",
    )
    table.auto_set_font_size(False)
    table.set_fontsize(12)
    table.scale(1, 2)

    # Center align all cells
    for key, cell in table.get_celld().items():
        cell.set_text_props(ha="center", va="center")

    axes[0].set_title("Metrics", pad=20)

    # Right: scatter
    ax = axes[1]
    sns.scatterplot(x=y_test, y=y_pred_test, alpha=0.6, ax=ax)
    mn = min(y_test.min(), y_pred_test.min())
    mx = max(y_test.max(), y_pred_test.max())
    ax.plot([mn, mx], [mn, mx], linestyle="--", color="k", linewidth=1)

    # Highlight a few outliers (top 5 by absolute error)
    errors = (y_test - pd.Series(y_pred_test, index=y_test.index)).abs()
    n_outliers = min(5, len(errors))
    if n_outliers > 0:
        top_idx = errors.nlargest(n_outliers).index
        ax.scatter(
            y_test.loc[top_idx],
            pd.Series(y_pred_test, index=y_test.index).loc[top_idx],
            color="red",
            s=60,
            label="Outliers",
        )
        for i in top_idx:
            ax.annotate(
                f"{int(errors.loc[i]):,}",
                (y_test.loc[i], pd.Series(y_pred_test, index=y_test.index).loc[i]),
                textcoords="offset points",
                xytext=(5, 5),
                ha="left",
                fontsize=8,
            )

    ax.set_xlabel("Actual price")
    ax.set_ylabel("Predicted price")
    ax.set_title("Predicted vs Actual (test set)")
    ax.legend()

    fig.tight_layout()
    fig.savefig(out_file)
    print(f"Saved visualization to {out_file}")


if __name__ == "__main__":
    main()
