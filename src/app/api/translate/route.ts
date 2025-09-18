import { NextRequest, NextResponse } from 'next/server';
const translateModule = require("@vitalets/google-translate-api");
const translate = translateModule.translate;

export async function POST(request: NextRequest) {
  try {
    const { text, targetLang = 'hi' } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ 
        original: text || '',
        translated: text || '',
        sourceLang: 'en',
        targetLang: targetLang,
        error: 'No text to translate'
      });
    }

    // Validate target language
    const supportedLanguages = ['hi', 'ta', 'te', 'bn', 'gu', 'kn', 'ml', 'mr', 'pa', 'or'];
    const validTargetLang = supportedLanguages.includes(targetLang) ? targetLang : 'hi';

    console.log(`Translating: "${text}" to ${validTargetLang}`);

    // Use Google Translate API
    try {
      const res = await translate(text, { to: validTargetLang });
      
      return NextResponse.json({
        original: text,
        translated: res.text,
        sourceLang: 'en',
        targetLang: validTargetLang,
        success: true
      });
    } catch (translateError) {
      console.error('Google Translate API error:', translateError);
      
      // Fallback to original text with error indicator
      return NextResponse.json({
        original: text,
        translated: text + ` (Translation failed)`,
        sourceLang: 'en',
        targetLang: validTargetLang,
        error: 'Translation service error',
        fallback: true
      });
    }

  } catch (error) {
    console.error('Translation error:', error);
    
    return NextResponse.json({
      original: 'Error',
      translated: 'Error',
      sourceLang: 'en',
      targetLang: 'hi',
      error: 'Translation service error'
    });
  }
}
