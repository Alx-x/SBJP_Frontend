import { Table } from "flowbite-react";
import degToDir from "degrees-to-direction";
import { PollutantMap, SensorData } from "../types";

export default function SensorDetails({ data }: { data: SensorData }) {
  const { name, city, aqius, main, pressure, temperature, wind_dir, wind_spd } =
    data;
  return (
    <Table hoverable={true}>
      <Table.Head>
        <Table.HeadCell>Property</Table.HeadCell>
        <Table.HeadCell>Value</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Name
          </Table.Cell>
          <Table.Cell>{name}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            City
          </Table.Cell>
          <Table.Cell>{city}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            AQI index
          </Table.Cell>
          <Table.Cell>{aqius}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Pollutant
          </Table.Cell>
          <Table.Cell>{PollutantMap[main]}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Pressure
          </Table.Cell>
          <Table.Cell>{pressure} hPa</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Temperature
          </Table.Cell>
          <Table.Cell>{temperature} °C</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Wind direction
          </Table.Cell>
          <Table.Cell>{wind_dir && degToDir(wind_dir)}</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Wind speed
          </Table.Cell>
          <Table.Cell>{wind_spd} m/s</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
