# Dynamic JSON to Excel Converter

This script converts any JSON file to Excel format with proper styling. It's now fully dynamic and supports both single file and batch processing.

## Features

- ✅ Converts any JSON file to Excel format
- ✅ Supports nested JSON structures with dot notation
- ✅ Creates well-formatted Excel files with headers and styling
- ✅ Auto-adjusts column widths based on content
- ✅ Includes metadata sheet with file information
- ✅ Batch processing for multiple files
- ✅ Custom output directory support
- ✅ Color-coded output for better user experience

## Requirements

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Usage

### Basic Usage

```bash
# Convert a single JSON file
./convert_json_to_excel.sh path/to/file.json

# Convert with custom output directory
./convert_json_to_excel.sh --output ./excel_files/ path/to/file.json
```

### Batch Processing

```bash
# Convert all JSON files in a directory
./convert_json_to_excel.sh --batch messages/

# Convert all JSON files with custom output directory
./convert_json_to_excel.sh --batch --output ./excel_files/ messages/
```

### Command Line Options

```bash
./convert_json_to_excel.sh [options] <json_file>
./convert_json_to_excel.sh --batch [directory]
```

**Options:**

- `--batch, -b` Convert all JSON files in a directory
- `--help, -h` Show help message
- `--output, -o` Specify output directory (default: same as input)

## Examples

### Single File Conversion

```bash
# Convert translation files
./convert_json_to_excel.sh messages/en.json
./convert_json_to_excel.sh messages/ar.json

# Convert with custom output
./convert_json_to_excel.sh --output ./excel_files/ data/config.json
```

### Batch Conversion

```bash
# Convert all JSON files in messages directory
./convert_json_to_excel.sh --batch messages/

# Convert all JSON files in current directory
./convert_json_to_excel.sh --batch

# Convert with custom output directory
./convert_json_to_excel.sh -o ./excel_files/ -b ./translations/
```

## Output

The generated Excel files will contain:

### Main Sheet: "Data"

- **Column A**: Key (e.g., "HomePage.HeroMcCoin.title")
- **Column B**: Value (e.g., "Welcome to McCoin")

### Metadata Sheet: "Metadata"

- Source file information
- Total number of keys
- File size
- Generation timestamp
- Notes about the file

## Example Output

### Single File Conversion

```
=== Dynamic JSON to Excel Converter ===
Checking for xlsx package...
Converting messages/en.json...
✓ Successfully created: messages/en.xlsx
  - Total keys: 539
✓ Successfully converted messages/en.json to messages/en.xlsx

Conversion complete!
```

### Batch Conversion

```
=== Dynamic JSON to Excel Converter ===
Checking for xlsx package...
Batch converting JSON files in messages/...
Found 2 JSON file(s) to convert
Converting messages/en.json...
✓ Successfully created: messages/en.xlsx
  - Total keys: 539
✓ Successfully converted messages/en.json to messages/en.xlsx
Converting messages/ar.json...
✓ Successfully created: messages/ar.xlsx
  - Total keys: 533
✓ Successfully converted messages/ar.json to messages/ar.xlsx

Batch conversion summary: 2/2 files converted successfully

Conversion complete!
```

## File Structure

After running the script, you'll have:

```
messages/
├── en.json
├── ar.json
├── en.xlsx          # Generated Excel file
└── ar.xlsx          # Generated Excel file

# Or with custom output directory:
excel_files/
├── en.xlsx
└── ar.xlsx
```

## Advanced Usage

### Convert Configuration Files

```bash
./convert_json_to_excel.sh config/settings.json
```

### Convert API Response Files

```bash
./convert_json_to_excel.sh --output ./api_data/ data/api_response.json
```

### Convert Multiple Directories

```bash
# Convert translations
./convert_json_to_excel.sh --batch messages/

# Convert config files
./convert_json_to_excel.sh --batch config/

# Convert all JSON files in project
./convert_json_to_excel.sh --batch --output ./all_excel_files/ .
```

## Troubleshooting

### Error: Node.js is not installed

Install Node.js from [nodejs.org](https://nodejs.org/)

### Error: npm is not installed

npm comes with Node.js. If you have Node.js but not npm, reinstall Node.js.

### Error: Failed to install xlsx package

Try installing it manually:

```bash
npm install xlsx
```

### Error: No JSON file specified

Make sure to provide a JSON file path as an argument:

```bash
./convert_json_to_excel.sh path/to/your/file.json
```

### Error: Directory not found

Make sure the directory path is correct and exists.

## Notes

- The script automatically flattens nested JSON structures using dot notation
- Column widths are automatically adjusted but capped at reasonable limits
- The script includes comprehensive error handling for missing files and invalid JSON
- Generated files are placed in the same directory as the source JSON files by default
- Use `--output` option to specify a custom output directory
- Batch mode recursively finds all `.json` files in the specified directory
- The script creates output directories automatically if they don't exist
