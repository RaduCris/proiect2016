'use strict';

angular.module('btravelappApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('btr', {
                parent: 'entity',
                url: '/btrs',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'btravelappApp.btr.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/btr/btrs.html',
                        controller: 'BtrController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('btr');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('btr.detail', {
                parent: 'entity',
                url: '/btr/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'btravelappApp.btr.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/btr/btr-detail.html',
                        controller: 'BtrDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('btr');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Btr', function($stateParams, Btr) {
                        return Btr.get({id : $stateParams.id});
                    }]
                }
            })
            .state('btr.new', {
                parent: 'btr',
                url: '/new',
                data: {
                    //authorities: ['ROLE_USER'], MODIFICAT 08.03.2016
                	authorities: ['ROLE_MANAGER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/btr/btr-dialog.html',
                        controller: 'BtrDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    status: null,
                                    start_date: null,
                                    end_date: null,
                                    location: null,
                                    center_cost: null,
                                    request_date: null,
                                    last_modified_date: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('btr', null, { reload: true });
                    }, function() {
                        $state.go('btr');
                    })
                }]
            })
            .state('btr.edit', {
                parent: 'btr',
                url: '/{id}/edit',
                data: {
                    //authorities: ['ROLE_USER'],  MODIFICAT 08.03.2016
                	authorities: ['ROLE_SUPPLIER'] ['ROLE_MANAGER'], //modificat 30.03.2016
                	//authorities: 
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/btr/btr-dialog.html',
                        controller: 'BtrDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Btr', function(Btr) {
                                return Btr.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('btr', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('btr.delete', {
                parent: 'btr',
                url: '/{id}/delete',
                data: {
                    //authorities: ['ROLE_USER'], MODIFICAT 08.03.2016
                	authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/btr/btr-delete-dialog.html',
                        controller: 'BtrDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Btr', function(Btr) {
                                return Btr.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('btr', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
        // close
        .state('btr.close', {
            parent: 'btr',
            url: '/{id}/close',
            data: {
                //authorities: ['ROLE_USER'], MODIFICAT 08.03.2016
            	authorities: ['ROLE_MANAGER'],
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'scripts/app/entities/btr/btr-close-dialog.html',
                    controller: 'BtrCloseController',
                    size: 'md',
                    resolve: {
                    	entity: function () {
                            return {
                            	entity: ['Btr', function(Btr) {
                                    return Btr.get({id : $stateParams.id});
                                }]                              
                            };
                        }
                    }
                }).result.then(function(result) {
                    $state.go('btr', null, { reload: true });
                }, function() {
                    $state.go('^');
                })
            }]
        });
    });
