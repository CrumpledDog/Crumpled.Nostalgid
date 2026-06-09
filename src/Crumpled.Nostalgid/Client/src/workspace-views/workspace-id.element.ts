import { UMB_CONTENT_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/content';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { css, customElement, html, LitElement, state } from '@umbraco-cms/backoffice/external/lit';
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';
import { client } from '../api/client.gen.js';

interface NostalgidLookupResponse {
id: number;
itemType: string;
tooorangey: boolean;
}

@customElement('nostalgid-workspace-id-view')
export class NostalgidWorkspaceIdViewElement extends UmbElementMixin(LitElement) {
@state()
private _id?: number;

@state()
private _loading = true;

@state()
private _error?: string;

@state()
private _tooorangey = false;

#notificationContext?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;

constructor() {
super();

this.consumeContext(UMB_NOTIFICATION_CONTEXT, (context) => {
this.#notificationContext = context;
});

this.consumeContext(UMB_CONTENT_WORKSPACE_CONTEXT, (workspaceContext) => {
const workspaceData = (workspaceContext as { data?: unknown } | undefined)?.data;

// Subscribe to workspace data changes
this.observe(workspaceData as any, (data: { unique?: string } | undefined) => {
void this.#loadId(data?.unique);
});
});
}

async #loadId(unique?: string) {
if (!unique || !this.#isGuid(unique)) {
this._id = undefined;
this._error = 'No persisted item key found yet.';
this._tooorangey = false;
this._loading = false;
return;
}

this._loading = true;
this._error = undefined;

try {
const response = await client.get<{ 200: NostalgidLookupResponse }, unknown>({
security: [
{
scheme: 'bearer',
type: 'http',
},
],
url: `/umbraco/crumplednostalgid/api/v1/key/${unique}/id`,
});

const status = response.response.status;

if (!response.response.ok) {
this._id = undefined;
this._tooorangey = false;

if (status === 401) {
this._error = 'Backoffice session is not authenticated. Please sign in again and refresh.';
} else if (status === 403) {
this._error = 'You are not allowed to view this integer id.';
} else if (status === 404) {
this._error = 'Could not resolve integer id.';
} else {
this._error = `Could not load integer id. (${status})`;
}

this._loading = false;
return;
}

const payload = response.data as NostalgidLookupResponse;
this._id = payload.id;
this._tooorangey = payload.tooorangey;
this._loading = false;
} catch (error) {
this._id = undefined;
this._tooorangey = false;
this._error = `Error loading integer id: ${error instanceof Error ? error.message : 'Unknown error'}`;
this._loading = false;
}
}

async #copyId() {
if (this._id === undefined) {
return;
}

await navigator.clipboard.writeText(`${this._id}`);
this.#notificationContext?.peek('positive', {
data: {
headline: 'Copied',
message: `Copied ID ${this._id}`,
},
});
}

#isGuid(value: string) {
return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

override render() {
if (this._loading) {
return html`<div class="center">Loading...</div>`;
}

if (this._error) {
return html`<div class="center">${this._error}</div>`;
}

return html`
<div class="wrap">
<button type="button" class=${`id ${this._tooorangey ? 'tooorangey' : ''}`} @click=${this.#copyId} title="Copy integer ID">${this._id}</button>
<uui-button look="secondary" color="default" compact @click=${this.#copyId} label="Copy integer ID">
<uui-icon name="icon-copy"></uui-icon>
</uui-button>
</div>
`;
}

static override styles = css`
:host {
display: grid;
place-items: center;
height: 100%;
padding: var(--uui-size-layout-4);
box-sizing: border-box;
}

.wrap {
display: flex;
align-items: center;
gap: var(--uui-size-space-4);
}

.id {
border: 0;
background: transparent;
cursor: pointer;
font-size: clamp(4rem, 22vw, 20rem);
font-weight: 900;
line-height: 1;
color: var(--uui-color-text);
}

.id.tooorangey {
color: #ff8c00;
}

.center {
font-size: var(--uui-type-h4-size);
text-align: center;
}
`;
}

export default NostalgidWorkspaceIdViewElement;

declare global {
interface HTMLElementTagNameMap {
'nostalgid-workspace-id-view': NostalgidWorkspaceIdViewElement;
}
}
