import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Download,
  SortAsc,
  SortDesc,
  Filter,
  Search,
} from "lucide-react"
import Papa from 'papaparse';

interface WorkshopData {
  "Name of the College": string;
  Location: string;
  "Webinar Date": string;
  "Workshop Mode": string;
  Organizer: string;
  Usage: number;
  Participants: number;
}

interface WorkshopDataTableProps {
  year: number;
}

export default function WorkshopDataTable({ year }: WorkshopDataTableProps) {
  const [data, setData] = useState<WorkshopData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof WorkshopData;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [filters, setFilters] = useState<{[key: string]: string}>({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update the fetch path to use the public directory
        const response = await fetch(`/data/Workshop/${year}.csv`);
        if (!response.ok) {
          throw new Error('Failed to fetch workshop data');
        }
        
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              console.error('CSV parsing errors:', results.errors);
            }
            setData(results.data as WorkshopData[]);
            setLoading(false);
          },
          error: (error: unknown) => {
            console.error('Error parsing CSV:', error);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error loading workshop data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

  const handleSort = (key: keyof WorkshopData) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilter = (column: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  const handleExport = () => {
    const csvContent = [
      Object.keys(data[0]).join(','),
      ...filteredData.map(row => 
        Object.values(row).map(value => 
          typeof value === 'string' ? `"${value}"` : value
        ).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workshop-data-${year}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredData = data
    .filter(row => {
      if (searchQuery) {
        return Object.values(row).some(value => 
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    })
    .filter(row => {
      return Object.entries(filters).every(([key, value]) => 
        String(row[key as keyof WorkshopData])
          .toLowerCase()
          .includes(value.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (!sortConfig) return 0;
      
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search all columns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={handleExport}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(data[0] || {}).map((column) => (
                <TableHead key={column}>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSort(column as keyof WorkshopData)}
                      className="flex items-center gap-1 hover:text-primary"
                    >
                      {column}
                      {sortConfig?.key === column && (
                        sortConfig.direction === 'asc' ? 
                          <SortAsc className="h-4 w-4" /> : 
                          <SortDesc className="h-4 w-4" />
                      )}
                    </button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Filter className="h-4 w-4 text-muted-foreground hover:text-primary" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <div className="p-2">
                          <Input
                            placeholder={`Filter ${column}...`}
                            value={filters[column] || ''}
                            onChange={(e) => handleFilter(column, e.target.value)}
                          />
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value, cellIndex) => (
                  <TableCell key={cellIndex}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}