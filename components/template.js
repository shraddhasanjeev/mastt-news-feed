/*
 * Each component has an independent JS file, which will be completely executed
 * as normal. Besides, you have to expose a function named interface(), which would
 * return the component message queue.
 * 
 */
console.log("Calling template API")




function interface() {
    console.log("Calling Template API");
}



module.exports = {
    interface
};