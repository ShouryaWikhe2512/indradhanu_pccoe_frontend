import React, { useState } from 'react';
import { ClassificationResult } from '@/types/report';
import { useI18n } from '@/lib/i18n';

interface ClassificationCardProps {
  classification: ClassificationResult;
  onConfirm?: () => void;
  onContest?: () => void;
  onEscalate?: () => void;
}

export default function ClassificationCard({
  classification,
  onConfirm,
  onContest,
  onEscalate,
}: ClassificationCardProps) {
  const { t } = useI18n();
  const [expandedReasoning, setExpandedReasoning] = useState(false);

  const confidencePercentage = Math.round(classification.confidence * 100);
  const confidenceColor =
    classification.confidence >= 0.8
      ? 'text-green-600'
      : classification.confidence >= 0.5
      ? 'text-yellow-600'
      : 'text-red-600';

  const actionLower = classification.recommended_action.toLowerCase();
  const urgencyLevel =
    actionLower.includes('high') || actionLower.includes('urgent')
      ? 'high'
      : actionLower.includes('medium') || actionLower.includes('moderate')
      ? 'medium'
      : 'low';

  const urgencyColors = {
    high: 'bg-red-100 text-red-800 border-red-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-blue-100 text-blue-800 border-blue-300',
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md border-2 border-saffron p-6 space-y-4">
      <div className="flex items-center justify-between border-b-2 border-saffron pb-3">
        <h2 className="text-xl font-bold text-gray-900">
          {t('result.title')}
        </h2>
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              classification.is_real
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {classification.is_real ? t('result.is_real.yes') : t('result.is_real.no')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('result.category')}
          </label>
          <p className="text-base text-gray-900 capitalize">
            {classification.category.replace(/_/g, ' ')}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('result.subcategory')}
          </label>
          <p className="text-base text-gray-900 capitalize">
            {classification.subcategory.replace(/_/g, ' ')}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('result.confidence')}
          </label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  classification.confidence >= 0.8
                    ? 'bg-green-600'
                    : classification.confidence >= 0.5
                    ? 'bg-yellow-600'
                    : 'bg-red-600'
                }`}
                style={{ width: `${confidencePercentage}%` }}
              ></div>
            </div>
            <span className={`text-sm font-semibold ${confidenceColor}`}>
              {confidencePercentage}%
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Urgency Level
          </label>
          <span
            className={`inline-block px-3 py-1 rounded-md text-sm font-semibold border ${urgencyColors[urgencyLevel]}`}
          >
            {urgencyLevel.toUpperCase()}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('result.reasoning')}
        </label>
        <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
          <p className="text-sm text-gray-700 line-clamp-3">
            {expandedReasoning
              ? classification.reasoning
              : classification.reasoning.split('.')[0] + '.'}
          </p>
          {classification.reasoning.length > 100 && (
            <button
              type="button"
              onClick={() => setExpandedReasoning(!expandedReasoning)}
              className="mt-2 text-sm text-indian-blue hover:underline focus:outline-none focus:ring-2 focus:ring-saffron rounded"
            >
              {expandedReasoning
                ? t('result.reasoning.collapse')
                : t('result.reasoning.expand')}
            </button>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('result.action')}
        </label>
        <div className="bg-blue-50 rounded-md p-3 border border-blue-200">
          <p className="text-sm text-gray-800">
            {classification.recommended_action}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
        {onConfirm && (
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-green text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2 transition-colors font-medium"
          >
            {t('result.confirm')}
          </button>
        )}
        {onContest && (
          <button
            type="button"
            onClick={onContest}
            className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors font-medium"
          >
            {t('result.contest')}
          </button>
        )}
        {onEscalate && (
          <button
            type="button"
            onClick={onEscalate}
            className="flex-1 px-4 py-2 bg-saffron text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 transition-colors font-medium"
          >
            Escalate to Ward Officer
          </button>
        )}
      </div>
    </div>
  );
}

