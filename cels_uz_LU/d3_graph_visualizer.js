const graphData = {
    day1: {
        nodes: [
            {
                id: "home",
                icon: "icons/home.svg",
                name: "Mājas",
                details: `Katru dienu uzsāku savās mājās Rīgā, Zolitudē, kur esmu dzīvojis visu savu mūžu. 
                Tālākais ikdienas ceļš vedīs vai nu uz universitāti, vai darbu. Kas notiks pēc tam? To tad jau redzēs.
                <br><br>
                Citās dienas gaita iespējams būs pavisam vienkārša - darbs vai studijas no mājām (bet to attēlot būtu pārāk garlaicīgi :)).
                `,
            },
            {
                id: "school",
                icon: "icons/school.svg",
                name: "Universitāte",
                details: `Pirmdienās jādodas uz Raiņa bulvāri - galveno Latvijas Universitātes ēku.`,
            },
            {
                id: "work",
                icon: "icons/office.svg",
                name: "Darbs",
                details: `Ap plkst. 12.00 beigušās lekcijas, un nu ir laiks iegūtās zināšanas praktiski pielietot, tai pat laikā palielinot IKP!
                <br><br>
                Jādodas uz darbu. Visdrīzāk uz kādu sapulci, tās parasti notiek pirmdienā. `,
            },
            {
                id: "home_return",
                icon: "icons/home.svg",
                name: "Mājas",
                details: `Diena nu galā! Esam mājās! 
                Kas tik notiks rīt?
                <br><br>
                Droši apskati pārējās nedēļas dienas!
                `,
            },
        ],
        links: [
            {
                source: "home",
                target: "school",
                icon: "icons/transport.svg",
            },
            {
                source: "school",
                target: "work",
                icon: "icons/walk.svg",
            },
            {
                source: "work",
                target: "home_return",
                icon: "icons/transport.svg",
            },
        ],
    },
    day2: {
        nodes: [
            {
                id: "home",
                icon: "icons/home.svg",
                name: "Mājas",
                details: `Labs rīts otrdienā!
                <br><br>
                Dienu joprojāmu sāku Zolitūdē, nekas nav mainījies.  Brokastīs visdrīzāk kafija un kāda desmaize, ja vien neesmu aizgulējies, tad gan pieturos pie bez-brokastu diētas.
                <br><br>
                Ja tomēr viss iet pēc plāna un brokastis ir notiesātas, tad doties tālāk esmu gatavs ap plkst. 7.00.
                `,
            },
            {
                id: "school",
                icon: "icons/school.svg",
                name: "Universitāte",
                details:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus pretium suscipit. Etiam facilisis turpis enim, non maximus quam vehicula tempor.<br><br> Phasellus sit amet mi nec urna ultricies auctor et euismod lorem. Vivamus sagittis nulla dolor, quis euismod purus ultrices non. Nam semper urna enim, et rhoncus nunc sollicitudin quis. Sed ac hendrerit orci. Vivamus elementum pulvinar aliquam.<br><br> Integer ullamcorper interdum tincidunt. Aenean lacinia mauris id lobortis elementum. ",
            },
            {
                id: "work",
                icon: "icons/office.svg",
                name: "Darbs",
                details:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus pretium suscipit. Etiam facilisis turpis enim, non maximus quam vehicula tempor.<br><br> Phasellus sit amet mi nec urna ultricies auctor et euismod lorem. Vivamus sagittis nulla dolor, quis euismod purus ultrices non. Nam semper urna enim, et rhoncus nunc sollicitudin quis. Sed ac hendrerit orci. Vivamus elementum pulvinar aliquam.<br><br> Integer ullamcorper interdum tincidunt. Aenean lacinia mauris id lobortis elementum. ",
            },
            {
                id: "home_return",
                icon: "icons/home.svg",
                name: "Mājas",
                details:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus pretium suscipit. Etiam facilisis turpis enim, non maximus quam vehicula tempor.<br><br> Phasellus sit amet mi nec urna ultricies auctor et euismod lorem. Vivamus sagittis nulla dolor, quis euismod purus ultrices non. Nam semper urna enim, et rhoncus nunc sollicitudin quis. Sed ac hendrerit orci. Vivamus elementum pulvinar aliquam.<br><br> Integer ullamcorper interdum tincidunt. Aenean lacinia mauris id lobortis elementum. ",
            },
        ],
        links: [
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
        ],
    },
    day3: {
        nodes: [
            {
                id: "home",
                icon: "icons/home.svg",
                name: "Mājas",
                details: `Trešdiena - mazā sestdiena
                <br><br>`,
            },
            {
                id: "school",
                icon: "icons/school.svg",
                name: "Universitāte",
                details:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus pretium suscipit. Etiam facilisis turpis enim, non maximus quam vehicula tempor.<br><br> Phasellus sit amet mi nec urna ultricies auctor et euismod lorem. Vivamus sagittis nulla dolor, quis euismod purus ultrices non. Nam semper urna enim, et rhoncus nunc sollicitudin quis. Sed ac hendrerit orci. Vivamus elementum pulvinar aliquam.<br><br> Integer ullamcorper interdum tincidunt. Aenean lacinia mauris id lobortis elementum. ",
            },
            {
                id: "work",
                icon: "icons/office.svg",
                name: "Darbs",
                details:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus pretium suscipit. Etiam facilisis turpis enim, non maximus quam vehicula tempor.<br><br> Phasellus sit amet mi nec urna ultricies auctor et euismod lorem. Vivamus sagittis nulla dolor, quis euismod purus ultrices non. Nam semper urna enim, et rhoncus nunc sollicitudin quis. Sed ac hendrerit orci. Vivamus elementum pulvinar aliquam.<br><br> Integer ullamcorper interdum tincidunt. Aenean lacinia mauris id lobortis elementum. ",
            },
            {
                id: "home_return",
                icon: "icons/home.svg",
                name: "Mājas",
                details:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus pretium suscipit. Etiam facilisis turpis enim, non maximus quam vehicula tempor.<br><br> Phasellus sit amet mi nec urna ultricies auctor et euismod lorem. Vivamus sagittis nulla dolor, quis euismod purus ultrices non. Nam semper urna enim, et rhoncus nunc sollicitudin quis. Sed ac hendrerit orci. Vivamus elementum pulvinar aliquam.<br><br> Integer ullamcorper interdum tincidunt. Aenean lacinia mauris id lobortis elementum. ",
            },
        ],
        links: [
            {
                source: "home",
                target: "school",
                icon: "icons/transport.svg",
            },
            {
                source: "home",
                target: "work",
                icon: "icons/transport.svg",
            },
            {
                source: "school",
                target: "home_return",
                icon: "icons/walk.svg",
            },
            {
                source: "work",
                target: "home_return",
                icon: "icons/transport.svg",
            },
        ],
    },
    day4: {
        nodes: [
            {
                id: "home",
                icon: "icons/home.svg",
                name: "Mājas",
                details:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus pretium suscipit. Etiam facilisis turpis enim, non maximus quam vehicula tempor.<br><br> Phasellus sit amet mi nec urna ultricies auctor et euismod lorem. Vivamus sagittis nulla dolor, quis euismod purus ultrices non. Nam semper urna enim, et rhoncus nunc sollicitudin quis. Sed ac hendrerit orci. Vivamus elementum pulvinar aliquam.<br><br> Integer ullamcorper interdum tincidunt. Aenean lacinia mauris id lobortis elementum. ",
            },
            {
                id: "school",
                icon: "icons/school.svg",
                name: "Universitāte",
                details:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus pretium suscipit. Etiam facilisis turpis enim, non maximus quam vehicula tempor.<br><br> Phasellus sit amet mi nec urna ultricies auctor et euismod lorem. Vivamus sagittis nulla dolor, quis euismod purus ultrices non. Nam semper urna enim, et rhoncus nunc sollicitudin quis. Sed ac hendrerit orci. Vivamus elementum pulvinar aliquam.<br><br> Integer ullamcorper interdum tincidunt. Aenean lacinia mauris id lobortis elementum. ",
            },
            {
                id: "home_return",
                icon: "icons/home.svg",
                name: "Mājas",
                details:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus pretium suscipit. Etiam facilisis turpis enim, non maximus quam vehicula tempor.<br><br> Phasellus sit amet mi nec urna ultricies auctor et euismod lorem. Vivamus sagittis nulla dolor, quis euismod purus ultrices non. Nam semper urna enim, et rhoncus nunc sollicitudin quis. Sed ac hendrerit orci. Vivamus elementum pulvinar aliquam.<br><br> Integer ullamcorper interdum tincidunt. Aenean lacinia mauris id lobortis elementum. ",
            },
        ],
        links: [
            {
                source: "home",
                target: "school",
                icon: "icons/transport.svg",
            },
            {
                source: "school",
                target: "home_return",
                icon: "icons/walk.svg",
            },
        ],
    },
    day5: {
        nodes: [
            {
                id: "home",
                icon: "icons/home.svg",
                name: "Mājas",
                details:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus pretium suscipit. Etiam facilisis turpis enim, non maximus quam vehicula tempor.<br><br> Phasellus sit amet mi nec urna ultricies auctor et euismod lorem. Vivamus sagittis nulla dolor, quis euismod purus ultrices non. Nam semper urna enim, et rhoncus nunc sollicitudin quis. Sed ac hendrerit orci. Vivamus elementum pulvinar aliquam.<br><br> Integer ullamcorper interdum tincidunt. Aenean lacinia mauris id lobortis elementum. ",
            },
            {
                id: "school",
                icon: "icons/school.svg",
                name: "Universitāte",
                details:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus pretium suscipit. Etiam facilisis turpis enim, non maximus quam vehicula tempor.<br><br> Phasellus sit amet mi nec urna ultricies auctor et euismod lorem. Vivamus sagittis nulla dolor, quis euismod purus ultrices non. Nam semper urna enim, et rhoncus nunc sollicitudin quis. Sed ac hendrerit orci. Vivamus elementum pulvinar aliquam.<br><br> Integer ullamcorper interdum tincidunt. Aenean lacinia mauris id lobortis elementum. ",
            },
            {
                id: "home_return",
                icon: "icons/home.svg",
                name: "Mājas",
                details:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus pretium suscipit. Etiam facilisis turpis enim, non maximus quam vehicula tempor.<br><br> Phasellus sit amet mi nec urna ultricies auctor et euismod lorem. Vivamus sagittis nulla dolor, quis euismod purus ultrices non. Nam semper urna enim, et rhoncus nunc sollicitudin quis. Sed ac hendrerit orci. Vivamus elementum pulvinar aliquam.<br><br> Integer ullamcorper interdum tincidunt. Aenean lacinia mauris id lobortis elementum. ",
            },
        ],
        links: [
            {
                source: "home",
                target: "school",
                icon: "icons/walk.svg",
            },
            {
                source: "school",
                target: "home_return",
                icon: "icons/walk.svg",
            },
        ],
    },
};

window.addEventListener("load", function () {
    const nodeUIDragRadius = 20;

    const svg = d3.select("#graph");

    // Set initial viewBox
    svg.attr(
        "viewBox",
        `0 0 ${svg.node().clientWidth} ${svg.node().clientHeight}`
    );

    // zooming behaviour for everything in the 'container'
    const zoom = d3.zoom().scaleExtent([0.5, 5]).on("zoom", zoomed);
    svg.call(zoom);
    const container = svg.append("g");

    const nodeGroup = container.append("g").attr("class", "nodes");
    const linkGroup = container.append("g").attr("class", "links");

    function loadGraph(day) {
        //clear existing graph
        linkGroup.selectAll("*").remove();
        nodeGroup.selectAll("*").remove();

        const { nodes, links } = graphData[day];

        // sets up the graph nodes in a straight line
        const viewBoxWidth = svg.node().viewBox.baseVal.width;
        const viewBoxHeight = svg.node().viewBox.baseVal.height;

        const centerX = viewBoxWidth / 2;
        const centerY = viewBoxHeight / 2;

        // Dynamically set up the graph nodes based on viewBox dimensions, placing them further apart horizontally
        nodes.forEach((node, i) => {
            const spacing =
                (i - (nodes.length - 1) / 2) *
                (viewBoxWidth / (nodes.length + 1)) *
                1.5; // Spread out horizontally
            node.x = centerX + spacing;
            node.y = centerY; // Keep vertically centered
        });
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

        // Center the SVG content by applying an initial transform
        const initialTransform = d3.zoomIdentity.translate(
            viewBoxWidth / 2 - centerX,
            viewBoxHeight / 2 - centerY
        );
        svg.call(zoom.transform, initialTransform);

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
            .attr("class", "fill-current gray-800 dark:gray-200");

        const node = nodeGroup
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
            )
            .on("click", (event, d) => {
                nodeClick(event, d);
            });

        // invisible circle around nodes for easier dragging
        node.append("circle")
            .attr("r", nodeUIDragRadius)
            .attr("fill", "transparent")
            .attr("stroke", "none");

        node.each(function (d) {
            d3.xml(d.icon).then((data) => {
                const importedNode = document.importNode(
                    data.documentElement,
                    true
                );
                const svgElement = d3
                    .select(this)
                    .append("g")
                    .attr("class", "node-icon")
                    .attr("transform", "translate(-12,-12)") // Center the icon
                    .node()
                    .appendChild(importedNode);

                d3.select(svgElement)
                    .selectAll("path")
                    .attr("class", "fill-current gray-800 dark:gray-200");
            });
        });

        const link = linkGroup
            .selectAll(".link")
            .data(links)
            .enter()
            .append("g")
            .attr("class", "link");

        link.append("path")
            .attr("class", "link-path stroke-current gray-800 dark:gray-200")
            .attr("marker-end", "url(#arrow)");

        link.each(function (d) {
            d3.xml(d.icon).then((data) => {
                const importedNode = document.importNode(
                    data.documentElement,
                    true
                );
                const svgElement = d3
                    .select(this)
                    .append("g")
                    .attr("class", "link-icon")
                    .node()
                    .appendChild(importedNode);

                d3.select(svgElement)
                    .attr("transform", "translate(-12,-12)")
                    .selectAll("path")
                    .attr("class", "fill-current gray-800 dark:gray-200");
            });
        });

        // Update positions based on simulation
        simulation.on("tick", () => {
            node.attr("transform", (d) => `translate(${d.x},${d.y})`);

            link.select(".link-path").attr("d", (d, i) => linkArc(d, i, 12));

            link.select(".link-icon").attr("transform", function (d) {
                const path = d3
                    .select(this.parentNode)
                    .select(".link-path")
                    .node();
                const length = path.getTotalLength();
                const midPoint = path.getPointAtLength(length / 2);
                return `translate(${midPoint.x},${midPoint.y})`;
            });
        });

        // Select the first node when the graph loads
        const firstNode = nodeGroup.select(".node").node();
        if (firstNode) {
            firstNode.dispatchEvent(new Event("click"));
        }

        //fitToViewBox(nodes);

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
            const dr = Math.sqrt(dx * dx + dy * dy) * 0.7;
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

        function fitToViewBox(nodes) {
            const bounds = container.node().getBBox();
            const fullWidth = svg.node().clientWidth;
            const fullHeight = svg.node().clientHeight;

            const width = bounds.width;
            const height = bounds.height;

            const midX = bounds.x + width / 2;
            const midY = bounds.y + height / 2;

            const scale =
                0.85 / Math.max(width / fullWidth, height / fullHeight);
            const translate = [
                fullWidth / 2 - scale * midX,
                fullHeight / 2 - scale * midY,
            ];

            svg.transition()
                .duration(750)
                .call(
                    zoom.transform,
                    d3.zoomIdentity
                        .translate(translate[0], translate[1])
                        .scale(scale)
                );
        }
    }

    let daySelection = document.getElementById("day-select");

    daySelection.addEventListener("change", function () {
        const selectedDay = this.value;
        loadGraph(selectedDay);
    });

    // to load the graph when page is opened/loaded
    var event = new Event("change");
    daySelection.dispatchEvent(event);

    function zoomed(event) {
        container.attr("transform", event.transform);
    }

    function unHighlightSelectedNode() {
        d3.selectAll(".highlight-circle").remove();
    }

    function nodeClick(event, nodeData) {
        // Clear existing node highlight
        unHighlightSelectedNode();

        // Determine the correct node element to highlight
        let nodeElement = d3.select(event.currentTarget);
        if (!nodeElement.classed("node")) {
            nodeElement = d3.select(event.target.closest(".node"));
        }

        // Highlight selected node
        var circle = nodeElement
            .append("circle")
            .attr(
                "class",
                "highlight-circle fill-current text-white dark:text-gray-800"
            )
            .attr("r", 20) // Adjust the radius as necessary
            .attr("stroke-width", 3)
            .node();

        nodeElement.node().insertBefore(circle, nodeElement.node().firstChild);

        // Set the new  explanation content
        const name = d3.select("#node-name");
        const details = d3.select("#node-details");

        name.html(nodeData.name);
        details.html(nodeData.details);
        // if the event bubbles up to the svg unHighlightSelectedNode() will execute
        // because of the graph click event (unhighlight when clicking anywhere in the graph)
        event.stopPropagation();
    }

    // remove node selection highlighter when user clicks anywhere in the graph that is not a node
    this.document
        .getElementById("graph")
        .addEventListener("click", function (e) {
            unHighlightSelectedNode();
        });

    // // Resize handler
    // window.addEventListener("resize", function () {
    //     const width = svg.node().clientWidth;
    //     const height = svg.node().clientHeight;
    //     svg.attr("viewBox", `0 0 ${width} ${height}`);
    //     // Optionally, you might want to reapply the zoom behavior or update the positions/scales
    // });
});
