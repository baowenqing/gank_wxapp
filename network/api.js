var Bmob = require('./Bmob-1.6.7.min.js');
Bmob.initialize("e3c5780520925a30911b7ccdfeac1978", "a9797a2ca020d7a2b1342cfb3b818999");



const PAGE_SIZE = 20;

function fetchData(gankType, page, callback) {
  // wx.request({
  //   url: 'https://gank.io/api/data/' + gankType + '/' + PAGE_SIZE + '/' + page,
  //   success: res => {
  //     callback.success(res)
  //   },
  //   complete: () => {
  //     callback.complete()
  //   }
  // })

  var type=1;
 
  switch (gankType){
    case "休息视频":
      type=3;
      break
    case "福利":
    case "妹子":
      type = 2;
      break
    default:
      type=1;
      break
  }
  const query = Bmob.Query("news");
  query.equalTo("data_type", "==", type);
  query.equalTo("tag", "==", gankType);
  query.limit(10);
  query.skip(10 * (page - 1) );
  query.find().then(res => {
    console.log(gankType, type,res)
    callback.success(res)
    callback.complete()
  });



}

function search(keyword, page, callback) {
  wx.request({
    url: 'https://gank.io/api/search/query/' + keyword + '/category/all/count/' + PAGE_SIZE + '/page/' + page,
    success: res => {
      callback.success(res)
    },
    complete: () => {
      callback.complete()
    }
  })
}

module.exports = {
  PAGE_SIZE: PAGE_SIZE,
  fetchData: fetchData,
  search: search
}