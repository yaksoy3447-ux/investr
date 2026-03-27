import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { prompt, userId } = await req.json();

    if (!prompt || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Remove strict backend Auth check to prevent 500 when Service Key is missing.
    // The route is protected by middleware.

    const systemPrompt = `
      Sen profesyonel bir melek yatırımcı (Angel Investor) ve risk sermayesi (VC) e-posta metin yazarısın. 
      Kullanıcı sana girişimi hakkında kısa bilgiler veya bir taslak verecek.
      Senin görevin bunu yatırımcıların ilgisini ilk saniyede çeken, kısa, etkileyici, aciliyet (Traction) belirten ve görüşme talep eden profesyonel bir soğuk e-postaya (Cold Email) dönüştürmek.
      
      E-postayı şu JSON formatında DÖNDÜR:
      {
        "subject": "Etkileyici E-posta Konusu",
        "body": "E-posta metni. 'Sayın Yatırımcı' diye başlasın, 'Saygılarımla, [Kurucu Adı]' şeklinde bitsin."
      }
      Sadece JSON döndür. Ekstra hiçbir açıklama metni yazma.
    `;

    const modelsToTry = [
      'claude-sonnet-4-20250514',
      'claude-3-5-sonnet-20241022',
      'claude-3-5-haiku-20241022',
    ];

    let response;
    let lastError;

    for (const model of modelsToTry) {
      try {
        response = await anthropic.messages.create({
          model: model,
          max_tokens: 1024,
          system: systemPrompt,
          messages: [
            { role: 'user', content: `Kullanıcı Notları / Şablonu: ${prompt}` }
          ],
        });
        break; // if successful, break the loop
      } catch (e: unknown) {
        lastError = e;
        const errMsg = e instanceof Error ? e.message : 'Unknown error';
        console.error(`Model ${model} failed:`, errMsg);
        // Continue to the next model
      }


    }

    if (!response) {
       throw lastError || new Error("All Anthropic models failed");
    }

    // Check if content exists and is a TextBlock
    const block = response.content[0];

    if (block && block.type === 'text') {
      const gptText = block.text;
      
      try {
        const jsonMatch = gptText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return NextResponse.json(parsed);
        } else {
            return NextResponse.json({ error: 'Invalid response format from AI' }, { status: 500 });
        }
      } catch (parseError) {
        console.error("JSON Parsing Error from AI:", parseError);
        return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
      }
    } else {
        return NextResponse.json({ error: 'unexpected response type' }, { status: 500 });
    }

  } catch (error) {
    console.error('AI Generation Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

