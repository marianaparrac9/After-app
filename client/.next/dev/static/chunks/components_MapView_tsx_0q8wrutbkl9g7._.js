(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/MapView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapView",
    ()=>MapView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const bounds = {
    minLat: 3.44,
    maxLat: 3.462,
    minLng: -76.546,
    maxLng: -76.524
};
const place = (lat, lng)=>{
    const x = (lng - bounds.minLng) / (bounds.maxLng - bounds.minLng) * 100;
    const y = (bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat) * 100;
    return {
        x: Math.min(86, Math.max(14, x)),
        y: Math.min(86, Math.max(14, y))
    };
};
const labelPrefix = (label)=>{
    if (label === "Rooftop") return "♪ ";
    if (label === "Drinks") return "🍸 ";
    return "";
};
const MapView = ({ events, selectedId, onSelect, origin, destination, showRoute })=>{
    const route = showRoute && origin && destination ? [
        place(origin.lat, origin.lng),
        place(destination.lat, destination.lng)
    ] : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "map-photo-wrap",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                className: "map-photo",
                src: "/images/map/city-map.png",
                alt: "Mapa de la ciudad"
            }, void 0, false, {
                fileName: "[project]/components/MapView.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            route ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "map-route",
                viewBox: "0 0 100 100",
                preserveAspectRatio: "none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                    points: `${route[0].x},${route[0].y} ${route[1].x},${route[1].y}`,
                    fill: "none",
                    stroke: "#c218d4",
                    strokeWidth: "1.6",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/components/MapView.tsx",
                    lineNumber: 51,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/MapView.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : null,
            events.map((event)=>{
                const spot = place(event.latitude, event.longitude);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: `map-label map-pin ${selectedId === event.id ? "selected" : ""}`,
                    style: {
                        left: `${spot.x}%`,
                        top: `${spot.y}%`
                    },
                    onClick: ()=>onSelect?.(event.id),
                    children: [
                        labelPrefix(event.mapLabel),
                        event.mapLabel
                    ]
                }, event.id, true, {
                    fileName: "[project]/components/MapView.tsx",
                    lineNumber: 63,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            })
        ]
    }, void 0, true, {
        fileName: "[project]/components/MapView.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = MapView;
var _c;
__turbopack_context__.k.register(_c, "MapView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/MapView.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/components/MapView.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_MapView_tsx_0q8wrutbkl9g7._.js.map