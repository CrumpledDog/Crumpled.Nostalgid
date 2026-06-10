# Crumpled.Nostalgid 

[![Downloads](https://img.shields.io/nuget/dt/Crumpled.Nostalgid?color=cc9900)](https://www.nuget.org/packages/Crumpled.Nostalgid/)
[![NuGet](https://img.shields.io/nuget/vpre/Crumpled.Nostalgid?color=0273B3)](https://www.nuget.org/packages/Crumpled.Nostalgid)
[![GitHub license](https://img.shields.io/github/license/CrumpledDog/Crumpled.Nostalgid?color=8AB803)](https://github.com/CrumpledDog/Crumpled.Nostalgid/blob/main/LICENSE)

Surface and use Umbraco's underlying integer node IDs in modern backoffice workflows.

![Crumpled Nostalgid](https://raw.githubusercontent.com/CrumpledDog/Crumpled.Nostalgid/raw/release/v1/docs/crumpled-nostalgid.png)

## What it does

- Adds legacy-style integer-ID redirect support for editor URLs.
- Supports both legacy hash routes:
	- `/umbraco#/content/content/edit/{id}`
	- `/umbraco#/media/media/edit/{id}`
- Redirects to modern key-based workspace URLs.
- Adds a workspace view to display and copy the underlying integer ID.

![Nostalgid workspace view showing integer ID](https://raw.githubusercontent.com/CrumpledDog/Crumpled.Nostalgid/raw/release/v1/docs/Nostalgid-workspace-view.jpg)

## Source and docs

See the repository for usage details and implementation notes:

https://github.com/CrumpledDog/Crumpled.Nostalgid