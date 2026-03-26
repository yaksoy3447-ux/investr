import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { prompt, userId } = await req.json();

    if (!prompt || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify user
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );
    
    const { data: user, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        { role: 'user', content: `Kullanıcı Notları / Şablonu: ${prompt}` }
      ],
    });

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

  } catch (error: any) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
