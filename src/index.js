var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var getUsername = document.querySelector("#user"); // Updated ID reference
var formSubmit = document.querySelector("#form");
var main_Container = document.querySelector(".main_container"); // Fixed class name
// Reusable fetch function
function myCustomeFetcher(url, options) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, options)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Network response was not ok - status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
// Function to display the user card UI
var showResultUI = function (singleUser) {
    main_Container.insertAdjacentHTML("beforeend", "<div class='card'>\n            <img src=\"".concat(singleUser.avatar_url, "\" alt=\"").concat(singleUser.login, "\" />\n            <hr />\n            <div class=\"card-footer\">\n                <img src=\"").concat(singleUser.avatar_url, "\" alt=\"").concat(singleUser.login, "\" />\n                <a href=\"").concat(singleUser.url, "\" target=\"_blank\">GitHub</a>\n            </div>\n        </div>"));
};
// Function to fetch user data and display results
function fetchUserData(url) {
    return __awaiter(this, void 0, void 0, function () {
        var userInfo, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, myCustomeFetcher(url, {})];
                case 1:
                    userInfo = _a.sent();
                    console.log("Fetched user info:", userInfo); // Log fetched data
                    userInfo.forEach(function (singleUser) { return showResultUI(singleUser); });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching data:", error_1 instanceof Error ? error_1.message : error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Default function call
fetchUserData("https://api.github.com/users");
// Perform search functionality
formSubmit.addEventListener('submit', function (e) { return __awaiter(_this, void 0, void 0, function () {
    var searchTerm, url, allUserData, matchingUsers, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                searchTerm = getUsername.value.toLowerCase();
                // Clear previous results
                main_Container.innerHTML = '<p>Loading...</p>'; // Show loading message
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                url = "https://api.github.com/users";
                return [4 /*yield*/, myCustomeFetcher(url, {})];
            case 2:
                allUserData = _a.sent();
                matchingUsers = allUserData.filter(function (user) {
                    return user.login.toLowerCase().includes(searchTerm);
                });
                main_Container.innerHTML = ''; // Clear loading message
                if (matchingUsers.length === 0) {
                    main_Container.insertAdjacentHTML("beforeend", "<p class=\"empty-msg\"> No Matching user found </p>");
                }
                else {
                    matchingUsers.forEach(function (singleUser) { return showResultUI(singleUser); });
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                main_Container.innerHTML = ''; // Clear loading message
                console.error("Error during search:", error_2 instanceof Error ? error_2.message : error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
