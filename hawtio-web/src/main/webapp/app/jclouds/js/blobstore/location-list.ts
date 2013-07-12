module Jclouds {
    export function BlobstoreLocationListController($scope, $location, workspace, jolokia, $routeParams) {
        $scope.blobstoreId = $routeParams.blobstoreId;

        $scope.result = {};
        $scope.locations = [];

        // selected locations
        $scope.selectedLocations = [];


        $scope.locationTable = {
            plugins: [],
            data: 'locations',
            showFilter: false,
            showColumnMenu: false,
            filterOptions: {
                useExternalFilter: true
            },
            selectedItems: $scope.selectedLocations,
            rowHeight: 32,
            selectWithCheckboxOnly: true,
            columnDefs: [
                {
                    field: 'id',
                    displayName: 'Id',
                    cellTemplate: '<div class="ngCellText"><a href="#/jclouds/blobstore/location/{{blobstoreId}}/{{row.getProperty(col.field)}}{{hash}}">{{row.getProperty(col.field)}}</a></div>',
                    width: 200,
                    resizable: false
                },
                {
                    field: 'description',
                    displayName: 'Description',
                    cellTemplate: '<div class="ngCellText">{{row.getProperty(col.field)}}</div>',
                    width: 200,
                    resizable: false
                }
            ]
        };

        Core.register(jolokia, $scope, {
            type: 'exec', mbean: getSelectionJcloudsBlobstoreMBean(workspace, $scope.blobstoreId), operation: 'listAssignableLocations()'
        }, onSuccess(render));


        function render(response) {
            if (!Object.equal($scope.result, response.value)) {
                $scope.result = response.value;
                $scope.locations = $scope.result
                Core.$apply($scope);
            }
        }
    }
}