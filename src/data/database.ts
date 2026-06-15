export interface Empleado {
  id: string;
  numeroEmpleado: string;
  nombre: string;
  puesto: string;
  champions: string[]; // Ej. "seguridad", "calidad", "mantenimiento"
  equipoAutonomoId: string;
  liderId?: string; // ID del líder si no es el líder mismo
  nivelBasico: number;
  nivelIntermedio: number;
  nivelAvanzado: number;
  direccionIp?: string; // IP Address de su dispositivo (opcional)
}

export interface EquipoAutonomo {
  id: string;
  nombre: string;
  lema: string;
  linea: string;
  autonomia: number;
  nivelLabel: string;
  liderId: string; // Referencia al ID del Empleado que es líder
}

export interface IndicadorProceso {
  id: string;
  categoria: "Productividad" | "Calidad" | "Seguridad" | "Mantenimiento";
  metrica: string;
  objetivo: string;
  valorActual: string;
  equiposFisicos: string[]; // Ej. Molinos, Tolva
  sistemas: string[]; // SAP, MES, etc.
  estado: "ok" | "warn" | "fail";
  tendencia: number[];
  equipoAutonomoId: string; // Referencia al Equipo Autónomo asignado
}

export interface BaseDeDatos {
  empleados: Empleado[];
  equiposAutonomos: EquipoAutonomo[];
  indicadoresProceso: IndicadorProceso[];
}

export const db: BaseDeDatos = {
  equiposAutonomos: [
    {
      id: "ea1",
      nombre: "Guardianes Cerveceros",
      lema: "Pilar de Mantenimiento Autónomo · Cocimientos",
      linea: "Cocimientos 2 · Sala de Cocción",
      autonomia: 3.2,
      nivelLabel: "Nivel 3 — Mejora Autónoma",
      liderId: "emp7",
    },
    {
      id: "ea2",
      nombre: "Sensory Avengers",
      lema: "Pilar de Calidad · Bloque Frío",
      linea: "Bloque Frío · Bodega de Fermentación",
      autonomia: 3.6,
      nivelLabel: "Nivel 3 — Mejora Autónoma",
      liderId: "emp9",
    },
    {
      id: "ea3",
      nombre: "Tech Guardians",
      lema: "Pilar de Confiabilidad · Mantenimiento",
      linea: "Área Mantenimiento · Brewery Maintenance",
      autonomia: 0,
      nivelLabel: "Evaluación de Autonomía",
      liderId: "emp17", // Por definir
    }
  ],
  empleados: [
    // --- Guardianes Cerveceros ---
    { id: "emp1", numeroEmpleado: "10001", nombre: "ALDO ADRIAN SIFUENTES", puesto: "Operador Senior", champions: ["seguridad", "calidad"], equipoAutonomoId: "ea1", liderId: "emp7", nivelBasico: 100, nivelIntermedio: 90, nivelAvanzado: 70, direccionIp: "10.0.1.15" },
    { id: "emp2", numeroEmpleado: "10002", nombre: "JOSE LUIS CAZARES", puesto: "Cocedor", champions: ["mantenimiento"], equipoAutonomoId: "ea1", liderId: "emp7", nivelBasico: 100, nivelIntermedio: 85, nivelAvanzado: 60, direccionIp: "10.0.1.16" },
    { id: "emp3", numeroEmpleado: "10003", nombre: "RAFAEL VERA", puesto: "Molinero", champions: ["ambiental"], equipoAutonomoId: "ea1", liderId: "emp7", nivelBasico: 100, nivelIntermedio: 75, nivelAvanzado: 45, direccionIp: "10.0.1.17" },
    { id: "emp4", numeroEmpleado: "10004", nombre: "URIEL ESCOBEDO", puesto: "Tablerista", champions: ["calidad", "seguridad"], equipoAutonomoId: "ea1", liderId: "emp7", nivelBasico: 100, nivelIntermedio: 95, nivelAvanzado: 80, direccionIp: "10.0.1.18" },
    { id: "emp5", numeroEmpleado: "10005", nombre: "VALERIA NATALY CASTAÑON", puesto: "Filtración", champions: ["mantenimiento", "ambiental"], equipoAutonomoId: "ea1", liderId: "emp7", nivelBasico: 100, nivelIntermedio: 70, nivelAvanzado: 40, direccionIp: "10.0.1.19" },
    { id: "emp6", numeroEmpleado: "10006", nombre: "Diana Rojas", puesto: "Operador Jr.", champions: [], equipoAutonomoId: "ea1", liderId: "emp7", nivelBasico: 90, nivelIntermedio: 55, nivelAvanzado: 25, direccionIp: "10.0.1.20" },
    { id: "emp7", numeroEmpleado: "10007", nombre: "Raúl Gómez", puesto: "Líder de Turno", champions: ["seguridad", "calidad", "mantenimiento"], equipoAutonomoId: "ea1", nivelBasico: 100, nivelIntermedio: 100, nivelAvanzado: 90, direccionIp: "10.0.1.10" },
    { id: "emp8", numeroEmpleado: "10008", nombre: "Sofía Mendoza", puesto: "Operador", champions: ["ambiental"], equipoAutonomoId: "ea1", liderId: "emp7", nivelBasico: 100, nivelIntermedio: 80, nivelAvanzado: 55, direccionIp: "10.0.1.21" },
    
    // --- Sensory Avengers ---
    { id: "emp9", numeroEmpleado: "10009", nombre: "Carlos Vega", puesto: "Líder de Turno", champions: ["seguridad", "calidad", "mantenimiento"], equipoAutonomoId: "ea2", nivelBasico: 100, nivelIntermedio: 100, nivelAvanzado: 95, direccionIp: "10.0.2.10" },
    { id: "emp10", numeroEmpleado: "10010", nombre: "Lucía Torres", puesto: "Microbiología", champions: ["calidad", "ambiental"], equipoAutonomoId: "ea2", liderId: "emp9", nivelBasico: 100, nivelIntermedio: 95, nivelAvanzado: 85, direccionIp: "10.0.2.11" },
    { id: "emp11", numeroEmpleado: "10011", nombre: "Esteban Cruz", puesto: "Propagación", champions: ["mantenimiento"], equipoAutonomoId: "ea2", liderId: "emp9", nivelBasico: 100, nivelIntermedio: 90, nivelAvanzado: 75, direccionIp: "10.0.2.12" },
    { id: "emp12", numeroEmpleado: "10012", nombre: "Paola Reyes", puesto: "Fermentación", champions: ["seguridad"], equipoAutonomoId: "ea2", liderId: "emp9", nivelBasico: 100, nivelIntermedio: 85, nivelAvanzado: 65, direccionIp: "10.0.2.13" },
    { id: "emp13", numeroEmpleado: "10013", nombre: "Iván López", puesto: "Filtración Fría", champions: ["ambiental"], equipoAutonomoId: "ea2", liderId: "emp9", nivelBasico: 100, nivelIntermedio: 80, nivelAvanzado: 55, direccionIp: "10.0.2.14" },
    { id: "emp14", numeroEmpleado: "10014", nombre: "Mónica Aguilar", puesto: "Tablerista", champions: ["calidad"], equipoAutonomoId: "ea2", liderId: "emp9", nivelBasico: 100, nivelIntermedio: 95, nivelAvanzado: 80, direccionIp: "10.0.2.15" },
    { id: "emp15", numeroEmpleado: "10015", nombre: "Héctor Salinas", puesto: "Operador", champions: [], equipoAutonomoId: "ea2", liderId: "emp9", nivelBasico: 95, nivelIntermedio: 60, nivelAvanzado: 30, direccionIp: "10.0.2.16" },
    { id: "emp16", numeroEmpleado: "10016", nombre: "Brenda Núñez", puesto: "Operador Jr.", champions: [], equipoAutonomoId: "ea2", liderId: "emp9", nivelBasico: 90, nivelIntermedio: 50, nivelAvanzado: 20, direccionIp: "10.0.2.17" },
  ],
  indicadoresProceso: [
    // --- IPs Guardianes Cerveceros ---
    { id: "ip1", categoria: "Productividad", metrica: "Merma de molienda", objetivo: "≤ 1.20%", valorActual: "0.98%", equiposFisicos: ["Molinos", "Tolva de granos"], sistemas: ["SAP", "MES"], estado: "ok", tendencia: [1.2, 1.1, 1.0, 1.05, 0.98, 0.97, 0.98], equipoAutonomoId: "ea1" },
    { id: "ip2", categoria: "Calidad", metrica: "°Plato del mosto", objetivo: "16.0 ± 0.2", valorActual: "16.05", equiposFisicos: ["Cocedor", "Olla de mosto"], sistemas: ["ACADIA", "MES"], estado: "ok", tendencia: [16.0, 16.1, 15.9, 16.0, 16.05, 16.02, 16.05], equipoAutonomoId: "ea1" },
    { id: "ip3", categoria: "Productividad", metrica: "Tiempo de cocción", objetivo: "≤ 65 min", valorActual: "67 min", equiposFisicos: ["Cocedor"], sistemas: ["MES", "MANGYVER"], estado: "warn", tendencia: [62, 64, 65, 66, 67, 67, 67], equipoAutonomoId: "ea1" },
    { id: "ip4", categoria: "Calidad", metrica: "Tiempo de adición de lúpulo", objetivo: "± 30 s", valorActual: "+18 s", equiposFisicos: ["Cocedor", "Dosificador"], sistemas: ["ACADIA", "WVD"], estado: "ok", tendencia: [10, 12, 15, 18, 18, 17, 18], equipoAutonomoId: "ea1" },
    { id: "ip5", categoria: "Productividad", metrica: "Rendimiento de cocción", objetivo: "≥ 96%", valorActual: "94.2%", equiposFisicos: ["Whirlpool", "Filtro Prensa"], sistemas: ["SAP", "MES", "ACADIA"], estado: "fail", tendencia: [96, 95, 95, 94, 94, 94.5, 94.2], equipoAutonomoId: "ea1" },
    { id: "ip6", categoria: "Calidad", metrica: "Turbidez del mosto", objetivo: "≤ 30 EBC", valorActual: "22 EBC", equiposFisicos: ["Filtro Prensa"], sistemas: ["ACADIA"], estado: "ok", tendencia: [28, 26, 24, 23, 22, 22, 22], equipoAutonomoId: "ea1" },
    { id: "ip7", categoria: "Productividad", metrica: "Consumo de vapor", objetivo: "≤ 220 kg/hL", valorActual: "215 kg/hL", equiposFisicos: ["Cocedor", "Caldera"], sistemas: ["MANGYVER", "WVD"], estado: "ok", tendencia: [225, 222, 220, 218, 216, 215, 215], equipoAutonomoId: "ea1" },
    
    // --- IPs Sensory Avengers ---
    { id: "ip8", categoria: "Calidad", metrica: "pH del mosto frío", objetivo: "5.20 ± 0.05", valorActual: "5.22", equiposFisicos: ["Tanque de Propagación", "Intercambiador"], sistemas: ["ACADIA", "MES"], estado: "ok", tendencia: [5.2, 5.21, 5.22, 5.21, 5.22, 5.22, 5.22], equipoAutonomoId: "ea2" },
    { id: "ip9", categoria: "Calidad", metrica: "Oxígeno disuelto", objetivo: "8 - 10 ppm", valorActual: "9.1 ppm", equiposFisicos: ["Línea de aireación", "Intercambiador"], sistemas: ["ACADIA"], estado: "ok", tendencia: [8.5, 8.8, 9.0, 9.2, 9.1, 9.1, 9.1], equipoAutonomoId: "ea2" },
    { id: "ip10", categoria: "Productividad", metrica: "Temperatura de fermentación", objetivo: "12.5 ± 0.3 °C", valorActual: "12.9 °C", equiposFisicos: ["Tanque CCT 12", "Glycol"], sistemas: ["MES", "MANGYVER"], estado: "warn", tendencia: [12.5, 12.6, 12.7, 12.8, 12.9, 12.9, 12.9], equipoAutonomoId: "ea2" },
    { id: "ip11", categoria: "Calidad", metrica: "Conteo de levadura", objetivo: "12-15 M cel/mL", valorActual: "13.4 M", equiposFisicos: ["Tanque de Propagación"], sistemas: ["ACADIA", "WVD"], estado: "ok", tendencia: [12, 12.8, 13.1, 13.3, 13.4, 13.4, 13.4], equipoAutonomoId: "ea2" },
    { id: "ip12", categoria: "Productividad", metrica: "Presión de tanque", objetivo: "0.8 - 1.2 bar", valorActual: "1.35 bar", equiposFisicos: ["Tanque CCT 08"], sistemas: ["MES"], estado: "fail", tendencia: [1.0, 1.1, 1.2, 1.25, 1.3, 1.32, 1.35], equipoAutonomoId: "ea2" },
    { id: "ip13", categoria: "Calidad", metrica: "Diacetilo", objetivo: "≤ 0.10 ppm", valorActual: "0.07 ppm", equiposFisicos: ["Tanques CCT", "Cromatógrafo"], sistemas: ["ACADIA"], estado: "ok", tendencia: [0.12, 0.10, 0.09, 0.08, 0.07, 0.07, 0.07], equipoAutonomoId: "ea2" },
    { id: "ip14", categoria: "Productividad", metrica: "Pérdidas en filtración", objetivo: "≤ 0.8%", valorActual: "0.6%", equiposFisicos: ["Filtro de Tierras", "Bombas"], sistemas: ["SAP", "MES"], estado: "ok", tendencia: [0.9, 0.8, 0.7, 0.65, 0.6, 0.6, 0.6], equipoAutonomoId: "ea2" }
  ]
};
