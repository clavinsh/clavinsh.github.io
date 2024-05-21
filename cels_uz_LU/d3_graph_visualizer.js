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
    ];

    nodes.forEach((node, i) => {
        node.x = (i + 1) * 150;
        node.y = 250;
    });

    const svg = d3.select("#graph");
    const width = svg.attr("width");
    const height = svg.attr("height");

    // arrow head marker defintion that gets placed at the end of a link
    svg.append("defs")
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
        .force("charge", d3.forceManyBody().strength(-400))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
        .selectAll(".link")
        .data(links)
        .enter()
        .append("g")
        .attr("class", "link")
        .append("line")
        .attr("marker-end", "url(#arrow)");

    const linkIcons = svg
        .selectAll(".link-icon")
        .data(links)
        .enter()
        .append("image")
        .attr("class", "link-icon")
        .attr("xlink:href", (d) => d.icon)
        .attr("width", 24)
        .attr("height", 24);

    const node = svg
        .selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
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
        .on("click", (d) => alert(`Node: ${d.id}`));

    // Update positions based on simulation
    simulation.on("tick", () => {
        link.attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);

        linkIcons
            .attr("x", (d) => (d.source.x + d.target.x) / 2 - 12)
            .attr("y", (d) => (d.source.y + d.target.y) / 2 - 12);

        node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

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
});
