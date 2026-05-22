import pandas as pd
import sqlite3

# Load cleaned data
df = pd.read_csv('../Data/cleaned_air_quality.csv')

# Connect to database
conn = sqlite3.connect('../database/air_quality.db')
cursor = conn.cursor()

# Insert data
for _, row in df.iterrows():
    cursor.execute("""
        INSERT INTO air_quality (
            city, date, pm25, pm10, no, no2, nox, nh3, co, so2, o3, aqi, aqi_bucket
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        row['city'], row['date'], row['pm25'], row['pm10'],
        row['no'], row['no2'], row['nox'], row['nh3'],
        row['co'], row['so2'], row['o3'], row['aqi'],
        row['aqi_bucket']
    ))

# Save & close
conn.commit()
conn.close()

print("✅ Data inserted into database!")