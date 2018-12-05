/**
 * Client Side Access Management mapping static routes with user roles (Admin/Customer).
 * @author - Shreya Shah
 */

let routingMap = {
    "customer": ["/browse","/subscription","/payment","/moviedetail"],
    "admin": ["/admin/useractivity","/admin/subscriptionreports","/admin/incomereports","/admin/movieactivity","/admin/dashboard",
    "/admin/dashboard/addmovie","/browse","/moviedetail","/admin/topactivity","/admin/allactivity"]
};

module.exports = routingMap;
