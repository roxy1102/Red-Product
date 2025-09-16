# TODO: Fix CORS, Mixed Content, and API URL Issues

## Completed Steps
- [x] Update frontend/src/services/api.ts to default API_URL to Railway backend
- [x] Update frontend/src/services/hotelService.ts to default API_URL to Railway backend
- [x] Update frontend/src/context/AuthProvider.tsx to use dynamic API_URL for logout instead of hardcoded localhost
- [x] Create frontend/src/constants.ts for shared API_URL
- [x] Update all services to import API_URL from constants
- [x] Update backend/config/cors.php to allow new Vercel domain

## Next Steps
- [ ] Set VITE_API_URL environment variable in Vercel to https://attractive-eagerness-backend4.up.railway.app
- [ ] Set APP_URL environment variable in Railway backend to https://attractive-eagerness-backend4.up.railway.app
- [ ] Redeploy frontend on Vercel
- [ ] Redeploy backend on Railway
- [ ] Test the application for CORS, mixed content, and authentication issues
