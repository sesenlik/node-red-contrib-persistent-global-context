module.exports = function(RED) {
    function PersistentGlobalContextNode(config) {
        RED.nodes.createNode(this,config);		
		
		
        this.on('input', function(msg, send, done) {
			// do something with 'msg'
			node.warn("TEST");
			// var obj = {};
			// var globalNames = global.keys();
			// for (var i = 0; i < globalNames.length; i++){
			// 	//obj[globalNames[i]] = Object.assign({}, global.get(globalNames[i]));
			// 	obj[globalNames[i]] = global.get(globalNames[i]);
			// }
			// node.warn(obj);

			// Once finished, call 'done'.
			// This call is wrapped in a check that 'done' exists
			// so the node will work in earlier versions of Node-RED (<1.0)
			if (done) {
				done();
			}
		});
    }
    RED.nodes.registerType("persistent-global-context",PersistentGlobalContextNode);
}