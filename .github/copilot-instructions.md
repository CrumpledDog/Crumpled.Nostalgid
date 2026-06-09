# Crumpled.Nostalgid - Copilot Instructions

## API Client Code Generation

The TypeScript API client files are auto-generated and must never be edited manually:

- src/Crumpled.Nostalgid/Client/src/api/types.gen.ts
- src/Crumpled.Nostalgid/Client/src/api/sdk.gen.ts
- src/Crumpled.Nostalgid/Client/src/api/client.gen.ts

### When to run codegen

Run codegen whenever you:

- Add, remove, or change any C# API controller endpoint
- Add, remove, or change any C# model returned by an API endpoint
- Need to update TypeScript types to match backend API changes

### How to run codegen

1. Start the test site (it must be running so OpenAPI can be fetched):

```bash
dotnet run --project src/Crumpled.Nostalgid.TestSite/Crumpled.Nostalgid.TestSite.csproj
```

2. In a separate terminal, run the generator:

```bash
cd src/Crumpled.Nostalgid/Client
npm run generate-client
```

3. Stop the test site when done.

The generator fetches the live OpenAPI spec from:

https://localhost:44307/umbraco/swagger/crumplednostalgid/swagger.json

### Never do this

- Do not manually edit types.gen.ts, sdk.gen.ts, or client.gen.ts
- Do not add properties to generated types by hand
- Manual edits will be overwritten the next time codegen runs

## Build Commands

```bash
# Build backend
dotnet build

# Build frontend client
cd src/Crumpled.Nostalgid/Client
npm run build
```

## Formatting Requirements

After any C# change, always run formatting:

```bash
dotnet format
dotnet format --verify-no-changes
```

Do not consider work complete until formatting verification succeeds.
