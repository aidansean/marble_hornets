from project_module import project_object, image_object, link_object, challenge_object

p = project_object('marble_hornets', 'Marble Hornets player and infographic generator')
p.domain = 'http://www.aidansean.com/'
p.path = 'marathon'
p.preview_image_ = image_object('http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg', 408, 287)
p.github_repo_name = 'marathon'
p.mathjax = True
p.links.append(link_object(p.domain, 'marathon', 'Live page'))
p.introduction = ''
p.overview = '''.'''

p.challenges.append(challenge_object('This project was mostly an opportunity to explore data visualisation.', 'Aligning the bar charts to match a given leg meant determining the width of the widest barchart and scaling the image appropriately.  It was necessary to write a scipt to generate histograms.', 'Resolved'))

p.challenges.append(challenge_object('The data were somewhat inhomogenous and incomplete.', 'Due to technical problems on the day, some data were missing, including team members not passing though checkpoints, so legs were not properly recorded.  In these cases the times had to be estimated assuming uniform performance across multiple legs of the race.', 'Resolved'))
