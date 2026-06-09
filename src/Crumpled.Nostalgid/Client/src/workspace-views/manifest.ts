import { UMB_DOCUMENT_WORKSPACE_ALIAS } from '@umbraco-cms/backoffice/document';
import { UMB_MEDIA_WORKSPACE_ALIAS } from '@umbraco-cms/backoffice/media';
import { UMB_WORKSPACE_CONDITION_ALIAS } from '@umbraco-cms/backoffice/workspace';

const adminOnlyCondition = {
alias: 'Umb.Condition.CurrentUser.IsAdmin',
};

export const manifests: Array<UmbExtensionManifest> = [
{
type: 'workspaceView',
name: 'Nostalgid Document Workspace View',
alias: 'Crumpled.Nostalgid.WorkspaceView.DocumentId',
element: () => import('./workspace-id.element.js'),
weight: 110,
meta: {
label: 'Nostalgid',
pathname: 'nostalgid',
icon: 'icon-old-key',
},
conditions: [
{
alias: UMB_WORKSPACE_CONDITION_ALIAS,
match: UMB_DOCUMENT_WORKSPACE_ALIAS,
},
adminOnlyCondition,
],
},
{
type: 'workspaceView',
name: 'Nostalgid Media Workspace View',
alias: 'Crumpled.Nostalgid.WorkspaceView.MediaId',
element: () => import('./workspace-id.element.js'),
weight: 110,
meta: {
label: 'Nostalgid',
pathname: 'nostalgid',
icon: 'icon-old-key',
},
conditions: [
{
alias: UMB_WORKSPACE_CONDITION_ALIAS,
match: UMB_MEDIA_WORKSPACE_ALIAS,
},
adminOnlyCondition,
],
},
];
