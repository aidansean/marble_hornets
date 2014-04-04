from project_module import project_object, image_object, link_object, challenge_object

p = project_object('marble_hornets', 'Marble Hornets player and infographic generator')
p.domain = 'http://www.aidansean.com/'
p.path = 'marathon'
p.preview_image_ = image_object('http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg', 408, 287)
p.github_repo_name = 'marble_hornets'
p.mathjax = True
p.links.append(link_object(p.domain, 'marble_hornets', 'Live page'))
p.introduction = ''
p.overview = '''.'''

p.challenges.append(challenge_object('', ''))

