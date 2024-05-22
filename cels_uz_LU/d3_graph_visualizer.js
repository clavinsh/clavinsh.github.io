document.addEventListener("DOMContentLoaded", function () {
    const nodes = [
        { id: "home", icon: "icons/home.svg" },
        { id: "school", icon: "icons/school.svg" },
        { id: "work", icon: "icons/office.svg" },
        { id: "home_return", icon: "icons/home.svg" },
    ];

    const links = [
        {
            source: "home",
            target: "school",
            icon: "icons/transport.svg",
        },
        {
            source: "school",
            target: "work",
            icon: "icons/transport.svg",
        },
        {
            source: "work",
            target: "home_return",
            icon: "icons/walk.svg",
        },
        {
            source: "work",
            target: "home_return",
            icon: "icons/transport.svg",
        },
    ];

    // sets up the graph nodes in a straight line
    nodes.forEach((node, i) => {
        node.x = (i + 1) * 150;
        node.y = 250;
    });

    const svg = d3.select("#graph");

    // zooming behaviour for everything in the 'container'
    const zoom = d3.zoom().scaleExtent([0.5, 5]).on("zoom", zoomed);
    svg.call(zoom);
    const container = svg.append("g");

    // force simulation between the graph nodes
    const simulation = d3
        .forceSimulation(nodes)
        .force(
            "link",
            d3
                .forceLink(links)
                .id((d) => d.id)
                .distance(150)
        )
        .force("charge", d3.forceManyBody().strength(-400));
    //.force("center", d3.forceCenter(width / 2, height / 2));

    // arrow head marker defintion that gets placed at the end of a link
    container
        .append("defs")
        .append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 10)
        .attr("refY", 5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("fill", "#999");

    const link = container
        .selectAll(".link")
        .data(links)
        .enter()
        .append("g")
        .attr("class", "link");

    link.append("path")
        .attr("class", "link-path")
        .attr("marker-end", "url(#arrow)");

    link.append("image")
        .attr("class", "link-icon")
        .attr("width", 24)
        .attr("height", 24)
        .attr("x", -12) // Center the image horizontally
        .attr("y", -12) // Center the image vertically
        .attr("xlink:href", (d) => d.icon);

    const node = container
        .selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .call(
            d3
                .drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
        );

    node.append("image")
        .attr("xlink:href", (d) => d.icon)
        .attr("class", "icon")
        .attr("width", 24)
        .attr("height", 24)
        .attr("x", -12) // Center the image horizontally
        .attr("y", -12) // Center the image vertically
        .on("click", nodeClick);

    // Update positions based on simulation
    simulation.on("tick", () => {
        link.select(".link-path").attr("d", (d, i) => linkArc(d, i, 12));

        link.select(".link-icon").attr("transform", function (d) {
            const path = d3.select(this.parentNode).select(".link-path").node();
            const length = path.getTotalLength();
            const midPoint = path.getPointAtLength(length / 2);
            return `translate(${midPoint.x},${midPoint.y})`;
        });

        node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    function zoomed(event) {
        container.attr("transform", event.transform);
    }

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    function linkArc(d, i, radius) {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy) * (1 + (i % 2) * 0.5); // Adjust curvature based on index
        const xRotation = 0; // No rotation
        const largeArc = 0; // Arc flags
        const sweep = i % 2; // Alternate sweep flag for up and down

        const totalLength = Math.sqrt(dx * dx + dy * dy);
        const offsetX = (dx * radius) / totalLength;
        const offsetY = (dy * radius) / totalLength;

        const sourceX = d.source.x + offsetX;
        const sourceY = d.source.y + offsetY;
        const targetX = d.target.x - offsetX;
        const targetY = d.target.y - offsetY;

        return `M${sourceX},${sourceY}A${dr},${dr} ${xRotation},${largeArc},${sweep} ${targetX},${targetY}`;
    }

    function nodeClick(d, i) {
        console.log("d", d);
        console.log("i", i);
    }
});
