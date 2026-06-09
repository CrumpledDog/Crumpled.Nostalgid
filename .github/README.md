# Crumpled.Nostalgid 

[![Downloads](https://img.shields.io/nuget/dt/Crumpled.Nostalgid?color=cc9900)](https://www.nuget.org/packages/Crumpled.Nostalgid/)
[![NuGet](https://img.shields.io/nuget/vpre/Crumpled.Nostalgid?color=0273B3)](https://www.nuget.org/packages/Crumpled.Nostalgid)
[![GitHub license](https://img.shields.io/github/license/CrumpledDog/Crumpled.Nostalgid?color=8AB803)](../LICENSE)

# Crumpled Nostalgid

Surfacing the underlying integer node id for a Content/Media item and helping you find and load a Content/Media in the Umbraco backoffice based on its integer node id.

<img src="docs/crumpled-nostalgid.png" width="150" />

## Why so?

In this modern era of Umbraco, the underlying integer node id has become hidden, in favour of the Guid based key, for the unique indentification of content/media/etc items. This makes it much easier to identify uniqueness across Umbraco environments.

Up to v13 of Umbraco, you could see the integer Id of a content or media item on the Info content app, and all 'routing' to edit content/media included the integer id.

We've gone from:

/umbraco#/content/content/edit/1234
to
/umbraco/section/content/workspace/document/edit/704a66de-b213-44fe-815a-f988c0707bbf/invariant/view/content

To all tents and porpoises you'd think that the integer id had gone forever, but it hasn't, it's still there joining all the database tables together and used on the 'Path' property of IPublishedContent `-1,12,123,1234` to provide ancestor context...

... this means that although there is little impact on the day to day editing experience there are some 'niche' support and maintenance activities that are serverely hobbled by this change ...

When things go wrong,under pressure to work out what is throwing the 500 error, or the ucontent is out of sync on Umbraco Cloud again, or using the database to find absolutely definitely all the places that the old office address was used and you produce an excel report with a handy 'edit link' directly into the backoffice...

In these circumstances, it's a pain to join back to the umbracoNode table to get the guid, to turn into the key, or if you have to type the Url in, you won't be able to remember the guid, but you can usually remember a 4 or 5 digit number, it's soooo much quicker, you can use the site search to find by integer id, but it's hard to explain, just providing a link is better.

## What does Nostalgid do?

It 'reinstates' the old style route, so /umbraco#/content/content/edit/1234 will now 302 redirect to the correct edit URL - (same for media with /umbraco#/media/media/edit/1235)

And it provides a new Workspace View for every content item and media item, that surfaces the underlying integer id, with a handy 'click and copy approach' to save those seconds.. 

<img src="docs/Nostalgid-workspace-view.jpg" />

## Not Nostalgic enough?

For those nostalgic for cobbled together packages on the flight out to Umbraco Codegarden for entry into the package competition, in the hope to win by catching the cheers of ironic popularism, there is a setting `tooorangey: true` - which when set, will render the node id in Orange.

## Installation

Add the package to an existing Umbraco website (v17+) from nuget:

`dotnet add package Crumpled.Nostalgid`

## Contributing

Contributions to this package are most welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md).

