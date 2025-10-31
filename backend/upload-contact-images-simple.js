const CloudinaryService = require('./src/services/cloudinary');
const fs = require('fs');
const path = require('path');

// Path to the contact-offices.ts file
const CONTACT_OFFICES_FILE = path.join(__dirname, '../frontend/src/data/contact-offices.ts');
const UPLOADS_DIR = path.join(__dirname, '../uploads/contact-offices');

// Office name to folder mapping
const officeFolderMap = {
  // Corporate Office
  'INSPECTORS 360 TIV â€“ UK': '01-Corporate-Office/UK',
  
  // Europe
  'INSPECTORS 360 TIV - Germany GmbH & Co. KG': '02-Europe/Germany',
  'INSPECTORS 360 TIV - France SARL': '02-Europe/France',
  'INSPECTORS 360 TIV - Portugal Lda': '02-Europe/Portugal',
  'INSPECTORS 360 TIV - Spain S. L': '02-Europe/Spain',
  'INSPECTORS 360 TIV â€“ Russia Ltd OOO': '02-Europe/Russia',
  'INSPECTORS 360 TIV â€“ Ukraine LLC/TOV': '02-Europe/Ukraine',
  
  // Emirates
  'INSPECTORS 360 TIV Emirates - Dubai â€“ UAE': '03-Emirates-Dubai-UAE/UAE',
  
  // Middle East & Africa
  'INSPECTORS 360 TIV - South Africa Pty Ltd': '04-Middle-East-Africa/South-Africa',
  'INSPECTORS 360 TIV - Namibia Pty Ltd': '04-Middle-East-Africa/Namibia',
  'INSPECTORS 360 TIV - Botswana Pty Ltd': '04-Middle-East-Africa/Botswana',
  'INSPECTORS 360 TIV - Zimbabwe LLC': '04-Middle-East-Africa/Zimbabwe',
  'INSPECTORS 360 TIV - Angola SA': '04-Middle-East-Africa/Angola',
  'INSPECTORS 360 TIV - DR Congo SARL': '04-Middle-East-Africa/DR-Congo',
  'INSPECTORS 360 TIV - Madagascar SARL': '04-Middle-East-Africa/Madagascar',
  'INSPECTORS 360 TIV - Mozambique SA': '04-Middle-East-Africa/Mozambique',
  'INSPECTORS 360 TIV - Zambia PVT LTD': '04-Middle-East-Africa/Zambia',
  'INSPECTORS 360 TIV - Malawi PVT LTD': '04-Middle-East-Africa/Malawi',
  'INSPECTORS 360 TIV - Tanzania LLC': '04-Middle-East-Africa/Tanzania',
  'INSPECTORS 360 TIV - Rwanda LLC': '04-Middle-East-Africa/Rwanda',
  'INSPECTORS 360 TIV - Republic of Congo SARL': '04-Middle-East-Africa/Republic-of-Congo',
  'INSPECTORS 360 TIV - Gabon SARL': '04-Middle-East-Africa/Gabon',
  'INSPECTORS 360 TIV - Uganda LTD': '04-Middle-East-Africa/Uganda',
  'INSPECTORS 360 TIV - Kenya LTD': '04-Middle-East-Africa/Kenya',
  'INSPECTORS 360 TIV - Ethiopia PLC': '04-Middle-East-Africa/Ethiopia',
  'INSPECTORS 360 TIV - Eritrea LLC': '04-Middle-East-Africa/Eritrea',
  'INSPECTORS 360 TIV - South Sudan LLC': '04-Middle-East-Africa/South-Sudan',
  'INSPECTORS 360 TIV - Chad SARL': '04-Middle-East-Africa/Chad',
  'INSPECTORS 360 TIV - Cameroon SARL': '04-Middle-East-Africa/Cameroon',
  'INSPECTORS 360 TIV - Equatorial Guinea SARL': '04-Middle-East-Africa/Equatorial-Guinea',
  'INSPECTORS 360 TIV - Nigeria LLC': '04-Middle-East-Africa/Nigeria',
  'INSPECTORS 360 TIV - Niger PVT': '04-Middle-East-Africa/Niger',
  'INSPECTORS 360 TIV - Ghana LTD': '04-Middle-East-Africa/Ghana',
  'INSPECTORS 360 TIV - Burkina Faso SARL': '04-Middle-East-Africa/Burkina-Faso',
  'INSPECTORS 360 TIV - Benin SARL LLC': '04-Middle-East-Africa/Benin',
  'INSPECTORS 360 TIV - Togo SARL': '04-Middle-East-Africa/Togo',
  'INSPECTORS 360 TIV - CÃ´te d\'Ivoire SARL': '04-Middle-East-Africa/Cote-dIvoire',
  'INSPECTORS 360 TIV - Mali SARL': '04-Middle-East-Africa/Mali',
  'INSPECTORS 360 TIV - Sierra Leone PVT LTD': '04-Middle-East-Africa/Sierra-Leone',
  'INSPECTORS 360 TIV - Guinea SARL': '04-Middle-East-Africa/Guinea',
  'INSPECTORS 360 TIV - Senegal SARL': '04-Middle-East-Africa/Senegal',
  'INSPECTORS 360 TIV â€“ Mauritania SARL': '04-Middle-East-Africa/Mauritania',
  
  // Hong Kong
  'INSPECTORS 360 TIV - Hong Kong': '05-Hong-Kong/Hong-Kong',
  
  // Asia-Pacific
  'INSPECTORS 360 TIV - China LLC': '06-Asia-Pacific/China',
  'INSPECTORS 360 TIV - Kazakhstan LLP': '06-Asia-Pacific/Kazakhstan',
  'INSPECTORS 360 TIV - Mongolia LLC': '06-Asia-Pacific/Mongolia',
  'INSPECTORS 360 TIV - India PVT LTD': '06-Asia-Pacific/India',
  'INSPECTORS 360 TIV - South Korea LLC': '06-Asia-Pacific/South-Korea',
  'INSPECTORS 360 TIV - Myanmar PLC': '06-Asia-Pacific/Myanmar',
  'INSPECTORS 360 TIV - Malaysia PLC': '06-Asia-Pacific/Malaysia',
  'INSPECTORS 360 TIV - Thailand PLC': '06-Asia-Pacific/Thailand',
  'INSPECTORS 360 TIV - Indonesia PT': '06-Asia-Pacific/Indonesia',
  'INSPECTORS 360 TIV - Philippines LLC': '06-Asia-Pacific/Philippines',
  'INSPECTORS 360 TIV - Australia Pty LTD': '06-Asia-Pacific/Australia',
  'INSPECTORS 360 TIV - Papua New Guinea LLC': '06-Asia-Pacific/Papua-New-Guinea',
  
  // Brazil
  'INSPECTORS 360 TIV â€“ Brazil Ltda': '07-Brazil/Brazil',
  
  // North & South America
  'INSPECTORS 360 TIV - USA LLC': '08-North-South-America/USA',
  'INSPECTORS 360 TIV â€“ Canada Inc': '08-North-South-America/Canada',
  'INSPECTORS 360 TIV - MÃ©xico S. de R. L': '08-North-South-America/Mexico',
  'INSPECTORS 360 TIV â€“ Dominican Republic SRL': '08-North-South-America/Dominican-Republic',
  'INSPECTORS 360 TIV - Venezuela PLC (S.A.)': '08-North-South-America/Venezuela',
  'INSPECTORS 360 TIV â€“ Trinidad & Tobago (Ltd.)': '08-North-South-America/Trinidad-and-Tobago',
  'INSPECTORS 360 TIV - French Guiana SARL': '08-North-South-America/French-Guiana',
  'INSPECTORS 360 TIV â€“ Suriname NV': '08-North-South-America/Suriname',
  'INSPECTORS 360 TIV - Guyana (PLLC)': '08-North-South-America/Guyana',
  'INSPECTORS 360 TIV â€“ Colombia (SAS)': '08-North-South-America/Colombia',
  'INSPECTORS 360 TIV - Peru (S.R.L.)': '08-North-South-America/Peru',
  'INSPECTORS 360 TIV â€“ Bolivia (SRL)': '08-North-South-America/Bolivia',
  'INSPECTORS 360 TIV - Ecuador (Cia. Ltda.)': '08-North-South-America/Ecuador',
  'INSPECTORS 360 TIV â€“ Chile SRL': '08-North-South-America/Chile',
  'INSPECTORS 360 TIV - Argentina SA': '08-North-South-America/Argentina',
  'INSPECTORS 360 TIV â€“ Paraguay SRL': '08-North-South-America/Paraguay',
  'INSPECTORS 360 TIV â€“ Uruguay SRL': '08-North-South-America/Uruguay'
};

// Function to find image files in a directory
function findImageFiles(dirPath) {
  const files = fs.readdirSync(dirPath);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
  });
}

// Function to update contact-offices.ts with image URLs
function updateContactOfficesFile(imageUrls) {
  try {
    let content = fs.readFileSync(CONTACT_OFFICES_FILE, 'utf8');
    
    // Add image field to OfficeData interface if not exists
    if (!content.includes('image_url?: string;')) {
      content = content.replace(
        'export interface OfficeData {',
        'export interface OfficeData {\n  image_url?: string;'
      );
    }
    
    // Update each office with its image URL
    Object.entries(imageUrls).forEach(([officeName, imageUrl]) => {
      if (imageUrl) {
        const regex = new RegExp(
          `(office_name: "${officeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?)(\\s+notes: "[^"]*"\\s*})`,
          'g'
        );
        content = content.replace(regex, `$1\n        image_url: "${imageUrl}",$2`);
      }
    });
    
    fs.writeFileSync(CONTACT_OFFICES_FILE, content, 'utf8');
    console.log('âœ… Successfully updated contact-offices.ts with image URLs');
  } catch (error) {
    console.error('âŒ Error updating contact-offices.ts:', error.message);
  }
}

// Main function
async function uploadAllImages() {
  console.log('ðŸš€ Starting image upload process...');
  
  const imageUrls = {};
  let uploadedCount = 0;
  let skippedCount = 0;
  
  // Process each office
  for (const [officeName, folderPath] of Object.entries(officeFolderMap)) {
    const fullPath = path.join(UPLOADS_DIR, folderPath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`âš ï¸  Folder not found: ${folderPath}`);
      skippedCount++;
      continue;
    }
    
    const imageFiles = findImageFiles(fullPath);
    
    if (imageFiles.length === 0) {
      console.log(`âš ï¸  No images found in: ${folderPath}`);
      skippedCount++;
      continue;
    }
    
    // Use the first image found
    const imageFile = imageFiles[0];
    const imagePath = path.join(fullPath, imageFile);
    const imageName = officeName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    
    console.log(`ðŸ“¤ Uploading: ${officeName}...`);
    
    try {
      const result = await CloudinaryService.uploadImage(
        imagePath, 
        'contact-offices', 
        folderPath.replace(/\//g, '-'), 
        imageName
      );
      
      if (result.success) {
        imageUrls[officeName] = result.url;
        uploadedCount++;
        console.log(`âœ… Uploaded: ${officeName} - ${result.url}`);
      } else {
        console.log(`âŒ Failed to upload: ${officeName}`);
        skippedCount++;
      }
    } catch (error) {
      console.log(`âŒ Error uploading ${officeName}: ${error.message}`);
      skippedCount++;
    }
  }
  
  // Update the contact-offices.ts file
  updateContactOfficesFile(imageUrls);
  
  console.log('\nðŸ“Š Upload Summary:');
  console.log(`âœ… Successfully uploaded: ${uploadedCount} images`);
  console.log(`âš ï¸  Skipped: ${skippedCount} offices`);
  console.log(`ðŸ“ Total processed: ${Object.keys(officeFolderMap).length} offices`);
  
  console.log('\nðŸŽ‰ Image upload process completed!');
}

// Run the script
uploadAllImages().catch(console.error);

