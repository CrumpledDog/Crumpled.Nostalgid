# Crumpled.Nostalgid Local Development

This README is for the project under `src/Crumpled.Nostalgid`.

## Prerequisites

- .NET SDK 10
- Node.js 20.19+ (Vite currently warns on lower patch versions)
- npm

Using a Node version manager is recommended:

- https://github.com/coreybutler/nvm-windows
- https://github.com/nvm-sh/nvm
- https://docs.volta.sh/guide/getting-started

## Frontend Build

Run from the client folder:

```bash
cd src/Crumpled.Nostalgid/Client
npm install
npm run build
```

Generated frontend artifacts are emitted to:

`src/Crumpled.Nostalgid/wwwroot/App_Plugins/crumpledNostalgid/`

## Frontend Watch Mode

```bash
cd src/Crumpled.Nostalgid/Client
npm run watch
```

This watches TypeScript changes and rebuilds into the App_Plugins output folder.

## API Client Codegen

When backend API contracts change, regenerate the TypeScript client.

1. Run the test site:

```bash
dotnet run --project src/Crumpled.Nostalgid.TestSite/Crumpled.Nostalgid.TestSite.csproj
```

2. In a second terminal:

```bash
cd src/Crumpled.Nostalgid/Client
npm run generate-client
```

The OpenAPI source is:

`https://localhost:44307/umbraco/swagger/crumplednostalgid/swagger.json`

## Build and Format

From repository root:

```bash
dotnet build
dotnet format
dotnet format --verify-no-changes
```
