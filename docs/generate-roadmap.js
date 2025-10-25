/**
 * Generate roadmap from design-dashboard-registry.csv
 */

const { RoadmapExporter } = require('../project-suite-claude-skills/project-planner/dist/core/RoadmapExporter');
const path = require('path');
const fs = require('fs');

async function main() {
  const registryPath = path.join(__dirname, 'design-dashboard-registry.csv');
  const outputDir = path.join(__dirname, 'roadmaps');

  console.log('Loading feature registry from:', registryPath);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const exporter = new RoadmapExporter(registryPath);

  // Generate Markdown roadmap
  console.log('Generating Markdown roadmap...');
  await exporter.exportToFile(
    'markdown',
    path.join(outputDir, 'design-dashboard-roadmap.md'),
    {
      groupBy: 'phase',
      includeCompleted: true,
      includeDependencies: true
    }
  );
  console.log('✓ Markdown roadmap created: roadmaps/design-dashboard-roadmap.md');

  // Generate HTML roadmap
  console.log('Generating HTML roadmap...');
  await exporter.exportToFile(
    'html',
    path.join(outputDir, 'design-dashboard-roadmap.html'),
    {
      groupBy: 'phase',
      includeCompleted: true
    }
  );
  console.log('✓ HTML roadmap created: roadmaps/design-dashboard-roadmap.html');

  // Generate JSON export
  console.log('Generating JSON export...');
  await exporter.exportToFile(
    'json',
    path.join(outputDir, 'design-dashboard-roadmap.json'),
    {
      includeCompleted: true,
      includeDependencies: true
    }
  );
  console.log('✓ JSON export created: roadmaps/design-dashboard-roadmap.json');

  console.log('\n✅ All roadmaps generated successfully!');
}

main().catch(console.error);
