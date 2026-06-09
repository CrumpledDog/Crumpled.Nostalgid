export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "CrumpledNostalgid Entrypoint",
    alias: "Crumpled.Nostalgid.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint.js"),
  },
];
