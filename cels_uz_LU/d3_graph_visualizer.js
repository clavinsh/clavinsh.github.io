window.addEventListener("load", function () {
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
                    Citās dienas iespējams dienas gaita būs pavisam vienkārša - darbs vai studijas no mājām (bet to attēlot būtu pārāk garlaicīgi :)).
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

    const nodeUIDragRadius = 20;

    const svg = d3.select("#graph");

    // zooming behaviour for everything in the 'container'
    const zoom = d3.zoom().scaleExtent([0.5, 5]).on("zoom", zoomed);
    svg.call(zoom);
    const container = svg.append("g");

    function loadGraph(day) {
        container.selectAll("*").remove(); //clear existing graph

        const { nodes, links } = graphData[day];

        // sets up the graph nodes in a straight line
        nodes.forEach((node, i) => {
            node.x = (i + 1) * 150;
            node.y = 250;
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
            .attr("class", "fill-current gray-800 dark:gray-200");

        const link = container
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
                    //.attr("transform", "translate(-12,-12)") // Center the icon
                    .node()
                    .appendChild(importedNode);

                d3.select(svgElement)
                    .attr("transform", "translate(-12,-12)")
                    .selectAll("path")
                    .attr("class", "fill-current gray-800 dark:gray-200");
            });
        });

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
            )
            .on("click", (event, d) => {
                nodeClick(d);
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

        // Update positions based on simulation
        simulation.on("tick", () => {
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
    }

    let daySelection = document.getElementById("day-select");

    daySelection.addEventListener("change", function () {
        const selectedDay = this.value;
        loadGraph(selectedDay);
    });

    var event = new Event("change");
    daySelection.dispatchEvent(event);

    function zoomed(event) {
        container.attr("transform", event.transform);
    }

    function nodeClick(nodeData) {
        // console.log("d", d);
        // console.log("i", i);

        const name = d3.select("#node-name");
        const details = d3.select("#node-details");

        name.html("");
        details.html(""); // Clear existing content

        name.html(nodeData.name);

        // details
        //     .append("h3")
        //     .attr("class", "text-xl font-bold")
        //     .text(nodeData.name);

        //details.append("p").text(`Details about ${nodeData.name}:`);

        details.html(nodeData.details);
        // .append("ul")
        // .selectAll("li")
        // .data(nodeData.details)
        // .enter()
        // .append("li")
        // .text((d) => d);
    }
});
