using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Umbraco.Cms.Core.Models.Membership;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;

namespace Crumpled.Nostalgid.Controllers
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "Crumpled.Nostalgid")]
    public class CrumpledNostalgidApiController : CrumpledNostalgidApiControllerBase
    {
        private readonly IBackOfficeSecurityAccessor _backOfficeSecurityAccessor;
        private readonly IContentService _contentService;
        private readonly IMediaService _mediaService;
        private readonly IConfiguration _configuration;

        public CrumpledNostalgidApiController(
            IBackOfficeSecurityAccessor backOfficeSecurityAccessor,
            IContentService contentService,
            IMediaService mediaService,
            IConfiguration configuration)
        {
            _backOfficeSecurityAccessor = backOfficeSecurityAccessor;
            _contentService = contentService;
            _mediaService = mediaService;
            _configuration = configuration;
        }

        [HttpGet("ping")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        public string Ping() => "Pong";

        [HttpGet("whatsTheTimeMrWolf")]
        [ProducesResponseType(typeof(DateTime), 200)]
        public DateTime WhatsTheTimeMrWolf() => DateTime.Now;

        [HttpGet("whatsMyName")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        public string WhatsMyName()
        {
            // So we can see a long request in the dashboard with a spinning progress wheel
            Thread.Sleep(2000);

            var currentUser = _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser;
            return currentUser?.Name ?? "I have no idea who you are";
        }

        [HttpGet("whoAmI")]
        [ProducesResponseType<IUser>(StatusCodes.Status200OK)]
        public IUser? WhoAmI() => _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser;

        [HttpGet("key/{key:guid}/id")]
        [ProducesResponseType<NostalgidIdLookupResponse>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<NostalgidIdLookupResponse> GetIntegerIdByKey(Guid key)
        {
            var tooorangey = _configuration.GetValue<bool>("Crumpled:Nostalgid:tooorangey");

            var content = _contentService.GetById(key);
            if (content is not null)
            {
                return Ok(new NostalgidIdLookupResponse(content.Id, "document", tooorangey));
            }

            var media = _mediaService.GetById(key);
            if (media is not null)
            {
                return Ok(new NostalgidIdLookupResponse(media.Id, "media", tooorangey));
            }

            return NotFound();
        }

        public record NostalgidIdLookupResponse(int Id, string ItemType, bool Tooorangey);
    }
}
