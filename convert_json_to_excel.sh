#!/bin/bash

# Dynamic JSON to Excel Converter Script
# Converts any JSON file to Excel format with proper styling using Node.js

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to show usage
show_usage() {
    echo -e "${BLUE}=== Dynamic JSON to Excel Converter ===${NC}"
    echo -e "${YELLOW}Usage:${NC}"
    echo -e "  $0 [options] <json_file>"
    echo -e "  $0 --batch [directory]"
    echo -e ""
    echo -e "${YELLOW}Options:${NC}"
    echo -e "  --batch, -b    Convert all JSON files in a directory"
    echo -e "  --help, -h     Show this help message"
    echo -e "  --output, -o   Specify output directory (default: same as input)"
    echo -e ""
    echo -e "${YELLOW}Examples:${NC}"
    echo -e "  $0 messages/en.json"
    echo -e "  $0 --batch messages/"
    echo -e "  $0 --output ./excel_files/ data/config.json"
    echo -e "  $0 -o ./output/ -b ./translations/"
    echo -e ""
    echo -e "${YELLOW}Features:${NC}"
    echo -e "  ✅ Converts any JSON file to Excel format"
    echo -e "  ✅ Supports nested JSON structures"
    echo -e "  ✅ Auto-adjusts column widths"
    echo -e "  ✅ Includes metadata sheet"
    echo -e "  ✅ Batch processing for multiple files"
    echo -e "  ✅ Custom output directory support"
}

# Function to check requirements
check_requirements() {
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        echo -e "${RED}Error: Node.js is not installed. Please install Node.js first.${NC}"
        exit 1
    fi

    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}Error: npm is not installed. Please install npm first.${NC}"
        exit 1
    fi

    # Install xlsx package if not already installed
    echo -e "${YELLOW}Checking for xlsx package...${NC}"
    if ! node -e "require('xlsx')" &> /dev/null; then
        echo -e "${YELLOW}Installing xlsx package...${NC}"
        npm install xlsx
        if [ $? -ne 0 ]; then
            echo -e "${RED}Error: Failed to install xlsx package. Please install it manually: npm install xlsx${NC}"
            exit 1
        fi
    fi
}

# Function to create the Node.js conversion script
create_conversion_script() {
    cat > convert_json_to_excel.js << 'EOF'
const fs = require('fs');
const path = require('path');

// Try to load xlsx module
let XLSX;
try {
    XLSX = require('xlsx');
} catch (e) {
    console.error('Error: xlsx module not found. Please install it with: npm install xlsx');
    process.exit(1);
}

function flattenObject(obj, parentKey = '', separator = '.') {
    const flattened = {};
    
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}${separator}${key}` : key;
            
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                Object.assign(flattened, flattenObject(obj[key], newKey, separator));
            } else {
                flattened[newKey] = obj[key];
            }
        }
    }
    
    return flattened;
}

function createExcelFromJson(jsonFile, outputFile) {
    try {
        // Read JSON file
        const jsonData = fs.readFileSync(jsonFile, 'utf8');
        const data = JSON.parse(jsonData);
        
        // Flatten the JSON structure
        const flattenedData = flattenObject(data);
        
        // Create workbook
        const workbook = XLSX.utils.book_new();
        
        // Prepare data for Excel
        const excelData = [
            ['Key', 'Value'], // Header row
            ...Object.entries(flattenedData).map(([key, value]) => [key, String(value)])
        ];
        
        // Create worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(excelData);
        
        // Set column widths
        const maxKeyLength = Math.max(...Object.keys(flattenedData).map(key => key.length));
        const maxValueLength = Math.max(...Object.values(flattenedData).map(value => String(value).length));
        
        worksheet['!cols'] = [
            { width: Math.min(maxKeyLength + 2, 50) },
            { width: Math.min(maxValueLength + 2, 60) }
        ];
        
        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        
        // Add metadata sheet
        const metadataData = [
            ['File Information'],
            ['Source File', jsonFile],
            ['Total Keys', Object.keys(flattenedData).length],
            ['Generated', new Date().toLocaleString()],
            ['File Size', fs.statSync(jsonFile).size + ' bytes'],
            [''],
            ['Note', 'This file was automatically generated from JSON.']
        ];
        
        const metadataSheet = XLSX.utils.aoa_to_sheet(metadataData);
        XLSX.utils.book_append_sheet(workbook, metadataSheet, 'Metadata');
        
        // Ensure output directory exists
        const outputDir = path.dirname(outputFile);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // Write to file
        XLSX.writeFile(workbook, outputFile);
        
        console.log(`✓ Successfully created: ${outputFile}`);
        console.log(`  - Total keys: ${Object.keys(flattenedData).length}`);
        
        return true;
        
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`✗ Error: File ${jsonFile} not found`);
        } else if (error instanceof SyntaxError) {
            console.error(`✗ Error: Invalid JSON in ${jsonFile}: ${error.message}`);
        } else {
            console.error(`✗ Error creating Excel file: ${error.message}`);
        }
        return false;
    }
}

function main() {
    const args = process.argv.slice(2);
    
    if (args.length !== 2) {
        console.log('Usage: node convert_json_to_excel.js <json_file> <output_file>');
        process.exit(1);
    }
    
    const jsonFile = args[0];
    const outputFile = args[1];
    
    if (!jsonFile.endsWith('.json')) {
        console.error('Error: Please provide a .json file');
        process.exit(1);
    }
    
    const success = createExcelFromJson(jsonFile, outputFile);
    if (!success) {
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}
EOF
}

# Function to convert a single file
convert_single_file() {
    local json_file=$1
    local output_dir=$2
    
    echo -e "${YELLOW}Converting ${json_file}...${NC}"
    
    if [ ! -f "$json_file" ]; then
        echo -e "${RED}Error: ${json_file} not found${NC}"
        return 1
    fi
    
    # Create output filename
    local base_name=$(basename "$json_file" .json)
    local output_file
    if [ -n "$output_dir" ]; then
        output_file="$output_dir/${base_name}.xlsx"
    else
        local dir_name=$(dirname "$json_file")
        output_file="$dir_name/${base_name}.xlsx"
    fi
    
    # Run the Node.js script
    node convert_json_to_excel.js "$json_file" "$output_file"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Successfully converted ${json_file} to ${output_file}${NC}"
        return 0
    else
        echo -e "${RED}✗ Failed to convert ${json_file}${NC}"
        return 1
    fi
}

# Function to convert all JSON files in a directory
convert_batch() {
    local directory=$1
    local output_dir=$2
    
    echo -e "${BLUE}Batch converting JSON files in ${directory}...${NC}"
    
    if [ ! -d "$directory" ]; then
        echo -e "${RED}Error: Directory ${directory} not found${NC}"
        return 1
    fi
    
    local json_files=($(find "$directory" -name "*.json" -type f))
    
    if [ ${#json_files[@]} -eq 0 ]; then
        echo -e "${YELLOW}No JSON files found in ${directory}${NC}"
        return 0
    fi
    
    echo -e "${PURPLE}Found ${#json_files[@]} JSON file(s) to convert${NC}"
    
    local success_count=0
    for file in "${json_files[@]}"; do
        if convert_single_file "$file" "$output_dir"; then
            ((success_count++))
        fi
    done
    
    echo -e "\n${BLUE}Batch conversion summary: ${success_count}/${#json_files[@]} files converted successfully${NC}"
    return $((success_count == ${#json_files[@]} ? 0 : 1))
}

# Main execution
main() {
    local batch_mode=false
    local output_dir=""
    local json_file=""
    local directory=""
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --help|-h)
                show_usage
                exit 0
                ;;
            --batch|-b)
                batch_mode=true
                shift
                ;;
            --output|-o)
                output_dir="$2"
                shift 2
                ;;
            -*)
                echo -e "${RED}Error: Unknown option $1${NC}"
                show_usage
                exit 1
                ;;
            *)
                if [ -z "$json_file" ] && [ -z "$directory" ]; then
                    if [ "$batch_mode" = true ]; then
                        directory="$1"
                    else
                        json_file="$1"
                    fi
                else
                    echo -e "${RED}Error: Too many arguments${NC}"
                    show_usage
                    exit 1
                fi
                shift
                ;;
        esac
    done
    
    # Check requirements
    check_requirements
    
    # Create conversion script
    create_conversion_script
    
    # Execute conversion
    if [ "$batch_mode" = true ]; then
        if [ -z "$directory" ]; then
            directory="."
        fi
        convert_batch "$directory" "$output_dir"
    else
        if [ -z "$json_file" ]; then
            echo -e "${RED}Error: No JSON file specified${NC}"
            show_usage
            exit 1
        fi
        convert_single_file "$json_file" "$output_dir"
    fi
    
    # Clean up
    rm -f convert_json_to_excel.js
    
    echo -e "\n${GREEN}Conversion complete!${NC}"
}

# Run main function with all arguments
main "$@"
