# Homey ANWB Traffic information

This is an application to let Homey let you know which traffic jams , police checks or road works there currently are on
the dutch roads.

## speech support

- English: traffic,trafficjam. Dutch:   staat er file, staan er files?
    Reports current traffic situation in the Netherlands

## Trigger cards (when column)

## Conditions ( AND Column)

- Let homey find out if there are traffic jams on a specific road.
- Let homey find out if there are any road works going on on a specific road.
- Let homey find out if there are any police checks going on on a specific road. 

## Action cards (Then column)

- Let Homey report a list of all traffic jams
- Let homey report all trafic jamms on a specific road
- Let homey report police checks, traffic jamms or road works on all or specific roads.

## Changelog

0.4.7
* Fixed the api. ANWB moved from http to https

0.4.6

* Changed the category from Internet to Location

0.4.5
* Added more N roads
* Added more A roads
* Changed all the Dropdown lists on various cards to choose roads too autocomplete fields.

0.4.4
* Fixed a grammar issue with radar checks condition
* Fixed a bug that would cause the api to return empty results instead of the real results

0.4.2
* Added condition to check if there are police checks on specified road
* Added condition to check if there are road works on specified road

0.4.0
* Bugfix release

0.3.2
* fixed a bug that would cause the app to crash when someone wanted to know road block information 

0.3.1
* Changed images and icon

0.3.0
* Refactor of code. Api has been moved to separate file
* Added summary card. Gives info about how many jams there are and the total distance

0.2.0
* Added trigger for traffic info on specified road.

0.1.0 
* Initial release

## Donate

If you like the app. Please consider a donation

[![paypal](https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q67ZKATD9QVLY)