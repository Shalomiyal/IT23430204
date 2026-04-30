# IT3040 Assignment - IT23430204

## What This Project Does
I made a Python Playwright script that tests the image preview 
feature on pixelssuite.com. It uploads a sample image, checks 
if the preview shows up, and saves the result.

## How to Install
Run these two commands in your terminal:

pip install playwright openpyxl
playwright install

## How to Run
Use this command to run the test:

python image_preview_test.py --url "https://www.pixelssuite.com/convert-to-png" --slow-mo-ms 2000

python image_preview_test-py  

## Results
The test saves results to execution_results.csv and puts 
screenshots in the results/ folder.