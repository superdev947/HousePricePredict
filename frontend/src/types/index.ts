export interface PropertyDetails {
  address?: string
  bedrooms: string
  bathrooms: string
  sqft_living: string
  sqft_lot: string
  floors: string
  sqft_above: string
  sqft_basement: string
  yr_built: string
  zipcode: string
}

export interface CsvData {
  bedrooms: number
  bathrooms: number
  sqft_living: number
  sqft_lot: number
  floors: number
  waterfront: number
  view: number
  condition: number
  grade: number
  sqft_above: number
  sqft_basement: number
  yr_built: number
  yr_renovated: number
  zipcode: string
  lat: number
  long: number
  sqft_living15: number
  sqft_lot15: number
}

export interface PredictionResult {
  price: number
  property?: Partial<PropertyDetails>
}
