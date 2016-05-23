var enabledAdMob = true;
var admobid = { banner : 'ca-app-pub-2925813122475584/9796513954' };

function initAdMob(){
  if (enabledAdMob){
      AdMob.createBanner({
          adId : admobid.banner,
          position : AdMob.AD_POSITION.BOTTOM_CENTER,
          autoShow : true,
          isTesting : true
      });
  }
}

document.addEventListener("deviceready", initAdMob, false);