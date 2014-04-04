from project_module import project_object, image_object, link_object, challenge_object

p = project_object('marble_hornets', 'Marble Hornets player and infographic generator')
p.domain = 'http://www.aidansean.com/'
p.path = 'marathon'
p.preview_image_ = image_object('http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg', 408, 287)
p.github_repo_name = 'marble_hornets'
p.mathjax = True
p.links.append(link_object(p.domain, 'marble_hornets', 'Live page'))
p.introduction = 'Marble Horets is an ongoing webseries that currently spans the course of about five years.  The premise of the series is that a student film maker started filming an amateur movie in 2006, but abandoned the film due to "unworkable conditions on set".  It quickly turns into a horror series that brings with some novel techniques.  However what really inspired me to make this project was the asynchronous storytelling narrative, which requires the viewer to piece together the true chronology based on the context of the videos.  I\'m an active participant on one of the busiest discussion boards for this series and regularly update this project as each new video is released.'
p.overview = '''So far, the Marble Hornets project has two main aspects to it.  The initial work began with the Marble Hornets player, a collection of youtube videos that are manipulated by the youtube JS API.  The user can autoplay all the videos in the series, filter based on many parameters, and even create their own playlists.  The player is made so that the user can autoplay everything in chronological order in full screen mode.  The data was originally stored in Javascript files, but this has since been moved to XML files to make maintenance and data entry easier and more portable.  After creating the player I added a lot of further information including links to the wikia pages, youtube videos and forum threads for each video, as well as the twitter feed, a real world map of filming locations and other interesting links, turning the player into a hub of information.

A previous version of the player was adapted to make the my_dads_tapes player, although I lost interest in the series and stopped updating that player.  At some point I intend to automate some of the player manipulation so that a user can create their own player for any youtube account, which would automatically source the relevant information and download the thumbnails.

The second aspect of the project is more interesting and challenging, and it is the automated creation of infographic images to help clarify the information known about the series.  These files are shared with the community on the  forums, and help users discuss the series.  Videos are split into scenes, which contains characters and items.  The scenes are sorted chronologically (although in many cases the chronological ordering is ambiguous, and the consensus opinion is usually taken in these cases) and then the characters and items are represented by arrows which flow from scene to scene.  The scenes are arranged in columns to give the location of the characters, or the owners of the items.  Users can create and enter their own XML files to make their own infographics, and automatically dump XML snippets by clicking on the scenes they wish to select.  The users can filter by characters, camerapersons, items, and seasons.  The scenes are colour coded to represent the sources of the footage.'''

p.challenges.append(challenge_object('I\'ll fill this in later, there have been many many challenges with this project!', 'Resolved'))

