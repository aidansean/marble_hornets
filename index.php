<?php
$title   = 'Marble Hornets' ;
$tagline = '"The following clips are raw footage excerpts from Alex Kralie."' ;
$favicon = 'icon.png' ;
$stylesheets = array('css/style.css') ;
$js_scripts  = array('js/scenes_data.js' , 'js/xml.js', 'js/scenes.js' , 'js/p_functions.js') ;
include($_SERVER['FILE_PREFIX'] . '/_core/preamble.php') ; ?>
<script>
var prefix = 'master' ;
var mode   = 'player' ;
</script>

  <div class="right">
    <p>This is a collection of useful information related to Marble Hornets.</p>
  </div>

  <div class="right">
    <h3>Links</h3>
    <div class="blurb">
      <ul>
        <li><a href="http://www.youtube.com/user/MarbleHornets">MarbleHornets youtube channel</a></li>
        <li><a href="http://www.youtube.com/user/totheark">totheark youtube channel</a></li>
        <li><a href="https://twitter.com/#!/marblehornets">MarbleHornets twitter feed</a></li>
        <li><a href="http://www.marblehornetsdvd.com/">MarbleHornets DVD page</a></li>
        <li><a href="https://maps.google.com/maps/ms?msid=207189072251540920862.0004bd8efa6c83ff98d14&amp;msa=0">Fan made Google map</a></li>
        <li><a href="http://forums.unfiction.com/forums/index.php?f=248">Unfiction forum</a></li>
        <li><a href="http://marblehornets.wikidot.com">MarbleHornets wikidot</a></li>
        <li><a href="http://tvtropes.org/pmwiki/pmwiki.php/WebVideo/MarbleHornets">TVTropes page</a></li>
        <li><a href="http://jtroyw.blogspot.com/">Troy Wagner's blog</a></li>
      </ul>
    </div>
  </div>

  <h3 id="controls_h3">Controls/Settings</h3>
      <table id="table_controls" class="table">
        <thead>
          <tr>
            <th colspan="2" class="left wide">Controls</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="left">Previous/next video</th>
            <td class="right">left/right</td>
          </tr>
          <tr>
            <th class="left">First/last video</th>
            <td class="right">up/down</td>
          </tr>
          <tr>
            <th class="left">Play/pause video</th>
            <td class="right">space</td>
          </tr>
          <tr>
            <th class="left">Volume up/down</th>
            <td class="right">+/-</td>
          </tr>
          <tr>
            <th class="left">Mute/unmute</th>
            <td class="right">m</td>
          </tr>
          <tr>
            <th class="left">Create playlist with current options</th>
            <td class="right">enter</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colspan="2" class="left wide">Settings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="left">Show spoilers</th>
            <td class="right">
              <input type="submit" value="Toggle" id="toggle_spoilers" name="Toggle" onclick="toggle_spoilers()"/>
              <span id="show_spoilers">False</span>
            </td>
          </tr>
          <tr>
            <th class="left">Autoplay video when on load</th>
            <td class="right">
              <input type="submit" value="Toggle" id="toggle_autoplay" name="Toggle" onclick="toggle_autoplay()"/>
              <span id="autoplay">True</span>
            </td>
          </tr>
          <tr>
            <th class="left">Auto skip to next video</th>
            <td class="right">
              <input type="submit" value="Toggle" id="toggle_autoskip" name="Toggle" onclick="toggle_autoskip()"/>
              <span id="autoskip">True</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  <h3 id="video_h3">Videos</h3>
    <div class="blurb">
      <p>Marble Hornets and totheark currently consist of <span id="nVideos">-</span> videos.</p>
      <p>The current playlist is <span id="total_runtime">-</span> long and contains <span id="nVideos_playlist">-</span> videos.</p>
      <div class="youtube_container">
        <object width="640" height="390" id="main_youtube_player" type="application/x-shockwave-flash" data="https://www.youtube.com/v/Wmhfn3mgWUI?version=3&amp;enablejsapi=1">
          <param name="movie" id="youtube_object_movie" value=""/>
          <param name="allowScriptAccess" value="always"/>
          <param name="allowFullScreen" value="true" />
        </object>

      </div>
      <table class="table" id="entry_information_table">
        <tbody>
          <tr>
            <th class="left">Title</th>
            <td class="right" id="entry_title"></td>
          </tr>
          <tr>
            <th class="left">Cameraperson(s)</th>
            <td class="right" id="entry_cameraperson"></td>
          </tr>
          <tr>
            <th class="left">Character(s)</th>
            <td class="right" id="entry_characters"></td>
          </tr>
          <tr>
            <th class="left">Description</th>
            <td class="right" id="entry_description"></td>
          </tr>
          <tr>
            <th class="left">youtube</th>
            <td class="right">
              <a href="" class="link" id="entry_youtube_link">Link</a>
              <a href="" class="link" id="entry_youtube_external_link" rel="external">+</a></td>
          </tr>
          <tr>
            <th class="left">wikidot</th>
            <td class="right">
              <a href="" class="link" id="entry_wikidot_link">Link</a>
              <a href="" class="link" id="entry_wikidot_external_link" rel="external">+</a></td>
          </tr>
          <tr>
            <th class="left">unfiction</th>
            <td class="right">
              <a href="" class="link" id="entry_unfiction_link">Link</a>
              <a href="" class="link" id="entry_unfiction_external_link" rel="external">+</a></td>
          </tr>
        </tbody>
      </table>
    </div>

    <hr />
    <div class="blurb">
      <table class="table"><tbody id="entries_tbody"><tr id="tr_remove"><th></th><td></td></tr></tbody></table>
    </div>

  <div class="right">
    <h3 id="playlist_h3">Playlist</h3>

    <table class="table" id="make_playlist_table">
      <thead>
        <tr>
          <th colspan="2" class="left wide">Make a playlist</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th class="left">Base playlist:</th>
          <td class="right">
            <select name="base_playlist" id="base_playlist">
              <option value="release"       selected="selected">Release order</option>
              <option value="chronological"                    >Chronological order</option>
            </select>
          </td>
        </tr>
        <tr>
          <th class="left">Channels</th>
          <td class="right">
            <select name="playlist_channel" id="playlist_channel">
              <option value="all_channels"  selected="selected">All channels</option>
              <option value="MarbleHornets"                    >MarbleHornets</option>
              <option value="totheark"                         >totheark</option>
            </select>
          </td>
        </tr>
        <tr>
          <th class="left">
            Include characters:<br />
            <input type="checkbox" id="playlist_filter_characters"/>Filter based on characters
          </th>
          <td class="right">
            <input type="checkbox" name="character_A"  checked="checked"/>Alex,
            <input type="checkbox" name="character_Am" checked="checked"/>Amy,
            <input type="checkbox" name="character_B"  checked="checked"/>Brian,
            <input type="checkbox" name="character_Br" checked="checked"/>Bruce,
            <input type="checkbox" name="character_H"  checked="checked"/>Hoody,
            <input type="checkbox" name="character_J"  checked="checked"/>Jay,
            <input type="checkbox" name="character_Je" checked="checked"/>Jessica,
            <input type="checkbox" name="character_M"  checked="checked"/>Masky,
            <input type="checkbox" name="character_O"  checked="checked"/>The Operator,
            <input type="checkbox" name="character_Sa" checked="checked"/>Sarah,
            <input type="checkbox" name="character_Se" checked="checked"/>Seth,
            <input type="checkbox" name="character_T"  checked="checked"/>Tim,
            <input type="checkbox" name="character_To" checked="checked"/>totheark,
            <input type="checkbox" name="character_U"  checked="checked"/>unknown character,
            <input type="checkbox" name="character_X"  checked="checked"/>other characters
          </td>
        </tr>
        <tr>
          <th class="left">Order of videos:</th>
          <td class="right">
            <select id="playlist_direction" name="playlist_direction">
              <option value="forwards"  selected="selected">Forwards</option>
              <option value="backwards"                    >Backwards</option>
            </select>
          </td>
        </tr>
        <tr>
          <th class="left">Make playlist:</th>
          <td class="right">
            <input type="submit" name="make_playlist"    value="Make playlist"           onclick="create_playlist()"/>
            <input type="submit" name="default_playlist" value="Reload default playlist" onclick="reset_playlist()" />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="right">
      <h3>Tweets</h3>
      <div class="blurb center">
        <a class="twitter-timeline"  href="https://twitter.com/marblehornets"  data-widget-id="326466491555905536">Tweets by @marblehornets</a>
        <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
      </div>
    </div>

    <div class="right">
      <h3>Google map</h3>
      <div class="blurb" style="text=align:center">
        <p>This is a fan made map containing the real world location of the some of the places in the series.</p>
        <object id="googleMap" type="text/html" width="754" height="300" data="https://maps.google.com/maps/ms?msid=207189072251540920862.0004bd8efa6c83ff98d14&amp;msa=0&amp;ie=UTF8&amp;ll=33.281888,-87.181056&amp;spn=0.134219,0.901127&amp;t=m&amp;output=embed"></object>
      </div>
    </div>

    <div class="right">
      <h3>Other videos</h3>
      <div class="blurb" style="text=align:center">
        <ul>
          <li><a href="http://www.youtube.com/watch?v=cRHVplrAl2E">Marble Hornets Q&A panel part 1 (GMX Convention, Nashville TN)</a></li>
          <li><a href="http://www.youtube.com/watch?v=ENYqrxopLvk">Marble Hornets Q&A panel part 2 (GMX Convention, Nashville TN)</a></li>
        </ul>
      </div>
    </div>

    <div class="right">
      <h3>Fun links</h3>
      <div class="blurb">
        <p>Blogs:</p>
        <ul>
          <li><a href="http://askamarblehornet.tumblr.com/">Ask a Marble Hornet</a></li>
          <li><a href="http://askslenderman.tumblr.com">Ask Slenderman</a></li>
          <li><a href="http://fuckyeahslenderman.tumblr.com">Fuck yeah, Slenderman blog</a></li>
        </ul>
        <p>Youtube:</p>
        <ul>
          <li><a href="http://www.youtube.com/user/MarbleBumbleBee/videos">Marble Bumblebee</a></li>
          <li><a href="http://www.youtube.com/user/totheinnertube/videos">totheinnertube</a></li>
          <li><a href="http://www.youtube.com/watch?v=3mk-vG5rAEU">Cooking with totheark</a></li>
          <li><a href="http://www.youtube.com/watch?v=4MXYC_jX2Wc">Splendorman</a></li>
          <li><a href="http://www.youtube.com/watch?v=Xj6F_piB_HE">Concrete giraffes</a></li>
          <li><a href="http://www.youtube.com/watch?v=d1DycH1titU">Slenderman is a crappy roommate</a></li>
          <li><a href="http://www.youtube.com/watch?v=ov3QGqZj92U">Alex gets a birthday surprise</a></li>
          <li><a href="http://www.youtube.com/watch?v=MlydGFrwpHM">Alex writes a script</a></li>
          <li><a href="http://www.youtube.com/watch?v=uuesRJf5EH8">Let's check our tunnel</a></li>
          <li><a href="http://www.youtube.com/watch?v=D8FGew9s0NU">Alex Kralie (Paparazzi parody)</a></li>
          <li><a href="http://www.youtube.com/user/SlenderManSings/videos">Slenderman sings</a></li>
        </ul>
        <p>Other:</p>
        <ul>
          <li><a href="http://www.blobber.org/index.php?id=45">Slender game walkthrough</a></li>
          <li><a href="http://makoki.deviantart.com/gallery/#/d5ca94b">Jay meme template</a></li>
        </ul>
      </div>
    </div>
  </div>

<?php foot() ; ?>
