module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/@core/components/**/*.{js,ts,jsx,tsx}'],
  important: '#__next',
  theme: {
    colors: {
      black: '#000',
      white: '#FFF',
      midnightexpress: '#1E293B',
      midnightExpress: '#1D273A',
      saltBoxBlue: '#64748B',
      brightGrey: '#EAECF0',
      blueBlouse: '#94A3B8',
      whiteEdgar: '#EDEDED',
      cascadingWhite: '#F6F6F6',
      creamyavocardo: '#D9F99D',
      milkFoam: '#F7FEE7',
      blueReflection: '#CBD5E1',
      libertyBlue: '#0C172C',
      blueZodiac: '#3A4355',
      crowBlack: '#273344'
    },
    fontFamily: {
      content: ['sans-serif'],
      Inter: ['Inter']
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px'
    },
    extend: {
      screens: {
        '2lg': '1150px'
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      fontSize: {
        36: '36px',
        32: '32px',
        30: '30px',
        24: '24px',
        22: '22px',
        20: '20px',
        18: '18px',
        16: '16px',
        14: '14px',
        12: '12px',
        8: '8px',
        6: '6px',
        4: '4px'
      },
      left: {
        360: '360px',
        '30p': '30%',
        '32p': '32%',
        '46p': '46%',
        '75p': '75%',
        '80p': '80%'
      },
      right: {
        '10p': '10%'
      },
      top: {
        '10p': '10%'
      },
      width: {
        'calc-20-minus-25': 'calc(20% - 25px)',
        'calc-20-minus-10': 'calc(20% - 10px)',
        'calc-50-minus-16': 'calc(50% - 16px)',
        'calc-50-minus-20': 'calc(50% - 20px)',
        'calc-50-minus-8': 'calc(50% - 8px)',
        'calc-50-minus-12': 'calc(50% - 12px)',
        'calc-50-minus-50': 'calc(50% - 50px)',
        'calc-100-minus-360': 'calc(100% - 360px)',
        'calc-33-minus-26': 'calc(100% / 3 - 80px / 3)',
        'calc-33-minus-16': 'calc(100% / 3 - 16px)',
        '48p': '48%',
        240: '240px',
        280: '280px',
        290: '290px',
        360: '360px',
        400: '400px',
        90: '90px'
      },
      height: {
        '2p': '2px',
        550: '550px',
        500: '500px',
        90: '90px'
      },
      spacing: {
        150: '150px',
        110: '110px',
        100: '100px',
        80: '80px',
        50: '50px',
        10: '40px',
        '2p': '2%',
        '5p': '5%',
        '8p': '8%',
        '10p': '10%',
        '12p': '12%',
        '18p': '18%',
        '13p': '13%',
        '15p': '15%',
        '20p': '20%',
        '23p': '23%',
        '25p': '25%',
        '30p': '30%',
        '35p': '35%',
        '40p': '40%',
        '45p': '45%',
        '50p': '50%',
        '55p': '55%',
        '60p': '60%',
        '65p': '65%',
        '70p': '70%',
        '73p': '73%',
        '75p': '75%',
        '78p': '78%',
        '79p': '79%',
        '80p': '80%',
        '82p': '82%',
        '83p': '83%',
        '85p': '85%',
        '90p': '90%',
        '95p': '95%'
      }
    }
  },
  darkMode: 'class',
  plugins: []
}
