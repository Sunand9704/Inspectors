# Translation Setup Guide

This guide will help you set up the production translation system for INSPECTORS.

## Prerequisites

1. Google Cloud Platform account
2. Google Cloud project with billing enabled
3. Cloud Translation API enabled

## Step 1: Get Google Cloud API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "API Key"
5. Copy the API key
6. (Optional) Restrict the API key to Cloud Translation API only

## Step 2: Configure Environment Variables

Add these to your `.env` file:

```env
# Google Cloud Translation
GOOGLE_CLOUD_API_KEY=your-api-key-here
GOOGLE_CLOUD_PROJECT_ID=your-project-id
```

## Step 3: Test the Setup

```bash
# List available pages
npm run list:pages

# Check translation status for a page
npm run check:translations testing

# Translate a page
npm run translate:page testing
```

## Usage

### Translate a Page
```bash
# Translate all English sections of a page to fr, pt, es, ru
npm run translate:page <page-slug>

# Examples:
npm run translate:page testing
npm run translate:page inspection
npm run translate:page certification
```

### List Available Pages
```bash
npm run list:pages
```

### Check Translation Status
```bash
npm run check:translations <page-slug>
```

## How It Works

1. **Fetches English sections** for the specified page
2. **Translates content** to 4 languages: French (fr), Portuguese (pt), Spanish (es), Russian (ru)
3. **Saves translations** in the `translations` Map object of each section
4. **Preserves original** English content while adding translated versions

## Translation Structure

Each section will have a `translations` object like this:

```javascript
{
  "fr": {
    "title": "Titre en franÃ§ais",
    "bodyText": "Contenu en franÃ§ais..."
  },
  "pt": {
    "title": "TÃ­tulo em portuguÃªs",
    "bodyText": "ConteÃºdo em portuguÃªs..."
  },
  "es": {
    "title": "TÃ­tulo en espaÃ±ol",
    "bodyText": "Contenido en espaÃ±ol..."
  },
  "ru": {
    "title": "Ð—Ð°Ð³Ð¾Ð»Ð¾Ð²Ð¾Ðº Ð½Ð° Ñ€ÑƒÑÑÐºÐ¾Ð¼",
    "bodyText": "Ð¡Ð¾Ð´ÐµÑ€Ð¶Ð¸Ð¼Ð¾Ðµ Ð½Ð° Ñ€ÑƒÑÑÐºÐ¾Ð¼..."
  }
}
```

## Rate Limiting

The script includes built-in rate limiting:
- 500ms delay between language translations
- 2 seconds delay between sections
- This prevents hitting Google Cloud API limits

## Error Handling

- Continues processing other sections if one fails
- Logs detailed error information
- Provides summary of successful/failed translations

## Cost Considerations

Google Cloud Translation API pricing:
- First 500,000 characters per month: **FREE**
- Additional characters: $20 per 1M characters

For typical INSPECTORS content, you'll likely stay within the free tier.





