import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let text: string = '';
  let targetLang: string = 'hi';
  let validTargetLang: string = 'hi';

  try {
    const body = await request.json();
    text = body.text;
    targetLang = body.targetLang || 'hi';

    // Validate target language
    const supportedLanguages = ['hi', 'ta', 'te', 'bn', 'gu', 'kn', 'ml', 'mr', 'pa', 'or'];
    validTargetLang = supportedLanguages.includes(targetLang) ? targetLang : 'hi';

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ 
        original: text || '',
        translated: text || '',
        sourceLang: 'en',
        targetLang: validTargetLang,
        error: 'No text to translate'
      });
    }

    console.log(`Translating: "${text}" to ${validTargetLang}`);

    // Use Google Translate API via fetch
    const encodedText = encodeURIComponent(text);
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${validTargetLang}&dt=t&q=${encodedText}`
    );

    if (!response.ok) {
      throw new Error('Translation failed');
    }

    const data = await response.json();
    type TranslationItem = [string, string, null, number];
    const translatedText = data[0].map((item: TranslationItem) => item[0]).join('');

    return NextResponse.json({
      original: text,
      translated: translatedText,
      sourceLang: 'en',
      targetLang: validTargetLang,
      success: true
    });

  } catch (error) {
    console.error('Translation error:', error);
    
    return NextResponse.json({
      original: text,
      translated: text + ' (Translation failed)',
      sourceLang: 'en',
      targetLang: validTargetLang,
      error: 'Translation failed'
    }, { status: 500 });
  }
}
