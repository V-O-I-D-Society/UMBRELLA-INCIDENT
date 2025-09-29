@echo off
echo Building the project...
call npm run build

if %ERRORLEVEL% EQU 0 (
  echo Build completed successfully!
  
  where netlify >nul 2>nul
  if %ERRORLEVEL% NEQ 0 (
    echo Netlify CLI is not installed. Installing...
    call npm install -g netlify-cli
  )
  
  echo Deploying to Netlify...
  call netlify deploy --prod --dir=dist
  
  echo Deployment process completed!
) else (
  echo Build failed. Fix the issues before deploying.
  exit /b 1
)