/* Public demo catalog. Availability is a demo flag, not a live booking guarantee. */
(function(root){
'use strict';
  var worries=['自分に合う仕事がわからない','今の仕事を続けるか迷っている','職場の人間関係がつらい','給料や評価に不満がある','働き方を見直したい','将来のキャリアが不安','新しい仕事に挑戦したい','自分の強みがわからない','まだうまく言葉にできない'];
  // Array order is the stable tie-break priority. Neutral worry 8 has no score.
  var counselors=[
    {id:'sato',available:true,name:'佐藤 美咲',domain:'自己理解・キャリアの棚卸し',bio:'これまでの経験や大切にしたい価値観を整理しながら、今の仕事を続けるか、別の道を考えるかを一緒に探ります。',weights:{0:3,1:2,5:2,7:3},image:'assets/counselor-listening.png',portrait:'listening'},
    {id:'takahashi',available:true,name:'高橋 遥',domain:'働き方・職場環境',bio:'仕事と生活のバランスや、無理のない働き方を考えたい方の相談を担当します。',weights:{2:3,3:3,4:3},image:'assets/counselor-welcome.png',portrait:'welcome'},
    {id:'nakamura',available:true,name:'中村 翔',domain:'転職・キャリアチェンジ',bio:'新しい職種や働き方への挑戦など、具体的な次の選択肢を考えたい方の相談を担当します。',weights:{1:2,5:2,6:3},image:'assets/illust-advisors.png',portrait:'male'}
  ];
  var data={worries:worries,counselors:counselors};
  if(typeof module==='object'&&module.exports)module.exports=data;else root.MichishiruMatchingData=data;
})(typeof window!=='undefined'?window:this);
