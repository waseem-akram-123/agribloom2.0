import fs from 'fs';
import path from 'path';

/**
 * Helper function to replace the mandi data CSV file
 * Call this function after placing your CSV file in the project
 */
export function replaceMandiDataCSV(csvFilePath: string): boolean {
  try {
    const targetPath = path.join(process.cwd(), 'src/data/csv/mandi-data.csv');
    
    // Check if source file exists
    if (!fs.existsSync(csvFilePath)) {
      console.error('Source CSV file not found:', csvFilePath);
      return false;
    }
    
    // Copy the file
    fs.copyFileSync(csvFilePath, targetPath);
    
    console.log('✅ Successfully replaced mandi data CSV file');
    console.log('📁 Source:', csvFilePath);
    console.log('📁 Target:', targetPath);
    
    return true;
  } catch (error) {
    console.error('❌ Error replacing CSV file:', error);
    return false;
  }
}

/**
 * Instructions for uploading your CSV file
 */
export function getCSVUploadInstructions(): string {
  return `
📋 **How to upload your government CSV data:**

1. **Place your CSV file** in the project root directory
2. **Rename it** to 'mandi-data.csv' 
3. **Move it** to: src/data/csv/mandi-data.csv
4. **Restart** your development server

📝 **Expected CSV format:**
market,commodity,state,district,min_price,max_price,modal_price,arrival_date,arrival_quantity,variety

🔧 **Alternative method:**
- Replace the file at: src/data/csv/mandi-data.csv
- The system will automatically use your data instead of sample data

💡 **Note:** 
- Prices should be in paise (will be converted to rupees automatically)
- Date format: YYYY-MM-DD
- All fields are optional except market, commodity, state, district
`;
}

/**
 * Validate CSV format
 */
export function validateCSVFormat(csvContent: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  try {
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      errors.push('CSV must have at least a header row and one data row');
      return { valid: false, errors };
    }
    
    const header = lines[0].toLowerCase();
    const requiredFields = ['market', 'commodity', 'state', 'district'];
    
    for (const field of requiredFields) {
      if (!header.includes(field)) {
        errors.push(`Missing required field: ${field}`);
      }
    }
    
    // Check for price fields
    const priceFields = ['min_price', 'max_price', 'modal_price'];
    const hasPriceFields = priceFields.some(field => header.includes(field));
    
    if (!hasPriceFields) {
      errors.push('Missing price fields (min_price, max_price, modal_price)');
    }
    
    return { valid: errors.length === 0, errors };
    
  } catch {
    errors.push('Invalid CSV format');
    return { valid: false, errors };
  }
}
