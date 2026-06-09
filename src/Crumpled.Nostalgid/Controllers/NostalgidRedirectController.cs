using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.Common.Authorization;

namespace Crumpled.Nostalgid.Controllers;

[ApiController]
[Authorize(AuthenticationSchemes = global::Umbraco.Cms.Core.Constants.Security.BackOfficeAuthenticationType, Policy = AuthorizationPolicies.SectionAccessContent)]
[Route("umbraco/nostalgid")]
public class NostalgidRedirectController : ControllerBase
{
    private readonly IContentService _contentService;
    private readonly IMediaService _mediaService;

    public NostalgidRedirectController(IContentService contentService, IMediaService mediaService)
    {
        _contentService = contentService;
        _mediaService = mediaService;
    }

    [HttpGet("{id:int}")]
    public IActionResult RedirectFromIntegerId(int id)
    {
        var content = _contentService.GetById(id);
        if (content is not null)
        {
            return Redirect(BuildContentEditorUrl(content.Key));
        }

        var media = _mediaService.GetById(id);
        if (media is not null)
        {
            return Redirect(BuildMediaEditorUrl(media.Key));
        }

        return NotFound();
    }

    private static string BuildContentEditorUrl(Guid key) =>
        $"/umbraco/section/content/workspace/document/edit/{key:D}/invariant";

    private static string BuildMediaEditorUrl(Guid key) =>
        $"/umbraco/section/media/workspace/media/edit/{key:D}/invariant";
}
