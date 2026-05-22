import pandas as pd

# Load dataset
df = pd.read_csv('../Data/raw_air_quality.csv')

# Convert Date
df['Date'] = pd.to_datetime(df['Date'])

# Rename columns
df.rename(columns={
    'City': 'city',
    'Date': 'date',
    'PM2.5': 'pm25',
    'PM10': 'pm10',
    'NO': 'no',
    'NO2': 'no2',
    'NOx': 'nox',
    'NH3': 'nh3',
    'CO': 'co',
    'SO2': 'so2',
    'O3': 'o3',
    'AQI': 'aqi',
    'AQI_Bucket': 'aqi_bucket'
}, inplace=True)

# Fill missing values
numeric_cols = df.select_dtypes(include='number').columns
for col in numeric_cols:
    df[col] = df[col].fillna(df[col].median())

# Drop rows where AQI missing
df = df.dropna(subset=['aqi'])

# Remove duplicates
df = df.drop_duplicates()

# Save cleaned data
df.to_csv('../data/cleaned_air_quality.csv', index=False)

print("✅ Cleaned data saved!")