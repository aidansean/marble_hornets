from project_module import project_object, image_object, link_object, challenge_object

p = project_object('marble_hornets', 'Marble Hornets')
p.domain = 'http://www.aidansean.com/'
p.path = 'marble_hornets'
p.preview_image    = image_object('%s/images/project.jpg'   %p.path, 150, 250)
p.preview_image_bw = image_object('%s/images/project_bw.jpg'%p.path, 150, 250)
p.folder_name = 'aidansean'
p.github_repo_name = 'marble_hornets'
p.mathjax = True
p.tags = 'Fiction,Poster'
p.technologies = 'canvas,CSS,HTML,JavaScript,MySQL,PHP,XML,YouTube'
p.links.append(link_object(p.domain, 'marble_hornets', 'Live page'))
p.introduction = 'Marble Hornets was a webseries that spans the course of about five years.  The premise of the series is that a student film maker started filming an amateur movie in 2006, but abandoned the film due to "unworkable conditions on set".  It quickly turns into a horror series that brings with some novel techniques.  However what really inspired me to make this project was the asynchronous storytelling narrative, which requires the viewer to piece together the true chronology based on the context of the videos.  I\'m an active participant on one of the busiest discussion boards for this series and regularly update this project as each new video is released.'
p.overview = '''So far, the Marble Hornets project has two main aspects to it.  The initial work began with the Marble Hornets player, a collection of youtube videos that are manipulated by the youtube JS API.  The user can autoplay all the videos in the series, filter based on many parameters, and even create their own playlists.  The player is made so that the user can autoplay everything in chronological order in full screen mode.  The data was originally stored in Javascript files, but this has since been moved to XML files to make maintenance and data entry easier and more portable.  After creating the player I added a lot of further information including links to the wikia pages, youtube videos and forum threads for each video, as well as the twitter feed, a real world map of filming locations and other interesting links, turning the player into a hub of information.

A previous version of the player was adapted to make the my_dads_tapes player, although I lost interest in the series and stopped updating that player.  At some point I intend to automate some of the player manipulation so that a user can create their own player for any youtube account, which would automatically source the relevant information and download the thumbnails.

The second aspect of the project is more interesting and challenging, and it is the automated creation of infographic images to help clarify the information known about the series.  These files are shared with the community on the  forums, and help users discuss the series.  Videos are split into scenes, which contains characters and items.  The scenes are sorted chronologically (although in many cases the chronological ordering is ambiguous, and the consensus opinion is usually taken in these cases) and then the characters and items are represented by arrows which flow from scene to scene.  The scenes are arranged in columns to give the location of the characters, or the owners of the items.  Users can create and enter their own XML files to make their own infographics, and automatically dump XML snippets by clicking on the scenes they wish to select.  The users can filter by characters, camerapersons, items, and seasons.  The scenes are colour coded to represent the sources of the footage.'''

p.challenges.append(challenge_object('The web series is told out of order, so one of the biggest problems to solve was sorting the scenes in order, when the order was sometimes ambiguous.', 'This was solved by following the fan-made "comprehensive timeline" when in doubt, and sorting the scenes with dates, and in the case of multiple scenes per day, by time.  The scenes are assigned timestamps, and the videos are assigned release dates.  With this in place, the scenes and videos can then be sorted quickly and easily.', 'Resolved'))

p.challenges.append(challenge_object('The data has to be stored in an organised manner.', 'Initially this was solved by declaring objects directly.  In order to make the data more portable and for other users to contribute, I wrote and parsed xml files, so that nearly all the data is sorted semantically.  One of the infographics keeps track of the exchange of posessions between characters, and this data is not yet accounted for in the xml files.', 'Resolved, to be revisited'))

p.challenges.append(challenge_object('This project required extensive use of the youtube js API.', 'Thanks to this project I can now queue up videos, make them autoplay, and use a timer to move between sections of video.', 'Resolved'))

p.challenges.append(challenge_object('The video stills had to respond to the user\'s actions.', 'The video player in this project allows the user to mouseover the video stills, with dynamic changes of style as the user does so, makng it more aesthetically pleasing.  This had to be responsive and with little overhead, and the result is rather pleasing.', 'Resolved'))

p.challenges.append(challenge_object('The timeline has to be laid out properly on the page.', 'This means that each element must be given enough space to display all the text and images, and then arranged to give the character arrows sufficient space.  This has been achieved using a text wrapping function, and parsing the lists of objects multiple times to ensure sufficient spacing.  Editing this code is not a pleasant experience though, it could certianly benefit from some refactoring.', 'Resolved, to be revisited'))

p.challenges.append(challenge_object('The player should allow the user to create a custom playlist', 'The user can create a playlst filtering by characters etc, and choosing to play in release order or chronological order.  The player also allows the user to watch all scenes in order.', 'Resolved'))

p.challenges.append(challenge_object('There have been many many challenges with this project, so I may add more as they occur to me!', '', 'Resolved'))

