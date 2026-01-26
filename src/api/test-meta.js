export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>TEST - Serverless Function Works!</title>
  <meta property="og:title" content="🎯 TEST - This is from Serverless Function!" />
  <meta property="og:description" content="If you see this, the serverless function is working!" />
  <meta property="og:image" content="https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Cover%20Assorta%20Final.png" />
</head>
<body>
  <h1>✅ Serverless Function is WORKING!</h1>
  <p>User-Agent: ${userAgent}</p>
  <p>Time: ${new Date().toISOString()}</p>
</body>
</html>
`;
  
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
}
