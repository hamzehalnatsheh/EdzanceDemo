class ResultsPostController{
    constructor($scope,$stateParams,moment,API,Post,$rootScope,$timeout,Upload,$log,$state){  
        'ngInject';
        //   
        this.$scope = $scope; 
        this.$scope.moment = moment;
        this.$stateParams = $stateParams;
        this.Post = new Post.constructor($rootScope, API,$timeout,moment,Upload,$log);
        var Post = this.Post;
        this.Post.seturl('solo/post/'+ $stateParams.resultsid);
        this.Post.setediturl('me/post-update');
        this.Post.setSection('home');
        this.Post.setCommentDeleteUrl('social/delete/home/comment');
        this.Post.settype('post');
        this.Post.setskip(0);
        this.Post.settake(1); 
        //this.Post.getPost();
        this.Post.getPost().then(function(response) {
            $scope.dat = Post.getPostat();
            $scope.nopost = Post.getnopost();
            $rootScope.busy = false;
        });
        $rootScope.type = 'post';
        this.$scope = $scope;
        //$scope.dat = [];
        //$scope.dat = Post.getPostat();
        // 
        this.$scope = $scope;

       $scope.getPost = function() {
        $scope.nopost = Post.getnopost();
            if($scope.dat.length == 0){
                Post.getPost();           
                $scope.dat = Post.getPostat();
                $scope.nopost = Post.getnopost();
                if($scope.nopost == 3){
                    $state.go('app.otherwise');
                }
                $rootScope.busy = false;
            }
        }
        $scope.exprissionUser = function($index,liker) {
           // Post.getPost();
            $rootScope.happyexp = 0
            $rootScope.normalexp = 0
            $rootScope.sadexp = 0
            Post.exprissionUser($index,liker);
            $scope.exprissions = Post.getExprissions();
          //console.log($rootScope.exprissions);
            $timeout(function () {
              $scope.exprissions =Post.getExprissions();
            }, 1000);
        }
        $scope.exprission = function($post,$exp) {
            Post.exprission($post,$exp);
            //$scope.dat = Post.getPostat();
        }
        $scope.deleteNode = function(node,deleteType) {
           Post.deleteNode(node,deleteType,$scope.callback);
           //$scope.dat = Post.getPostat();
        }
        $scope.callback = function() {
           $scope.nopost = Post.getnopost();
        } 
        $scope.permission = function(post) {
            return ($rootScope.me.permission.social.indexOf(post) >= 0);
        }
        $scope.postPermission = function(permission,post,me) {
            return (($rootScope.me.permission.social.indexOf(permission) >= 0 && post == me));
        }
        $scope.commentPermission = function(permission,comment,me,post) {
            return ($rootScope.me.permission.social.indexOf(permission) >= 0 && (comment == me || post == me));
        }
        $scope.submitComment = function($id,$index,$body,place) {
            Post.submitComment($id,$index,this,$body,place);
            this.comment[$id] = "";
            if (this.comment2 != undefined)
              this.comment2[$id] = "";
            //$scope.dat = Post.getPostat();
        }
        $scope.updateData = function(data ,id) {
            Post.updateData(data ,id);
        }
    }

    $onInit(){
    }
}

export const ResultsPostComponent = {
    templateUrl: './views/app/components/results-post/results-post.component.html',
    controller: ResultsPostController,
    controllerAs: 'vm',
    bindings: {}
}