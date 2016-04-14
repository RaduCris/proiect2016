'use strict';

angular.module('btravelappApp')
	.controller('BtrApproveController', function($scope, $uibModalInstance, entity, Btr) {

		//$scope.user = entity;
        $scope.btr = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        
        var onSaveSuccess = function (result) {
            $scope.$emit('btravelappApp:btrUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };
        
       /* var isManager = function(result){
        	result = $scope.user.idManager;
       }*/
        
        $scope.confirmApprove = function (id) {
        	$scope.isSaving = true;	
        	console.log($scope.btr.id); 	// returneaza id-ul btr-ului
        	console.log($scope.btr.user.idManager); // manager
        	console.log($scope.btr.assigned_to.idManager); // manager2
        	//if($scope.btr.user.idManager==null){
        	
        	if( $scope.btr.assigned_to.idManager != null )
	        	{
        		//if there is a manager n+2 then retrieve the login based on the idManager
	        		//$scope.btr.status="Waiting for approval";
        			//$scope.btr.assigned_to.login = $scope.btr.manager.idManager;
        			//$scope.btr.assigned_to.login = $scope.btr.assigned_to.idManager;
        			//var manager = $scope.btr.assigned_to.idManager;
        			
        		// TREBUIE SA VAD CUM MODIFIC ASSIGNED_TO DIN MANAGER IN MANAGER2 
        			//(adik din manager in manager2 <<manager-ul lui manager)
	        		$scope.btr.assigned_from = $scope.btr.manager;
	        		
	        	}
        	else
        		{
        			$scope.btr.status="Issuing ticket";//get the object instead of login
        			$scope.btr.assigned_from = $scope.btr.manager;
        			$scope.btr.assigned_to = $scope.btr.supplier;  
        			
        		}       			
        	
        	Btr.update($scope.btr, onSaveSuccess, onSaveError);
        	
        	console.log($scope.btr.assigned_to); //manager2 
        	console.log($scope.btr.assigned_from); // manager
        	
        	
        	//Btr.update($scope.btr, onSaveSuccess, onSaveError);
        	//}
        	//else
        	//	{
        		//console.log($scope.btr.assigned_to.login);
        		
        		
        		//console.log($scope.btr.manager); // supplier
        		//console.log($scope.btr.supplier); //manager
        		//console.log($scope.btr.user); //user
        		
        		
        		//Not ok yet
        		//Aici ar trebuie sa pun manager in loc de supplier la assigned_from
        		//$scope.btr.assigned_from.login = $scope.btr.assigned_to.login; 
        		
        		//Aici ar trebuie sa pun manager2 in loc de manager la assigned_to
        		//$scope.btr.assigned_to.login = $scope.btr.assigned_to.idManager; 
        		
        		
        		
        		
        		//}     	
        };
        
    });
