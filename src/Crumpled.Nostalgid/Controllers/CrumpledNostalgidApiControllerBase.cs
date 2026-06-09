using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;

namespace Crumpled.Nostalgid.Controllers
{
    [ApiController]
    [BackOfficeRoute("crumplednostalgid/api/v{version:apiVersion}")]
    [Authorize(Policy = AuthorizationPolicies.SectionAccessContent)]
    [MapToApi(Constants.ApiName)]
    public class CrumpledNostalgidApiControllerBase : ControllerBase
    {
    }
}
